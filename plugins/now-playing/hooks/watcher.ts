// Windows PowerShell 5.1 scripts over the system media session (the feed behind the Windows
// media flyout), so Chrome's YouTube Music tab shows up without any extension or adapter.
// Single quotes only, so each script survives being passed as one argv entry.

const PREAMBLE = [
  'Add-Type -AssemblyName System.Runtime.WindowsRuntime',
  '$null = [Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager,Windows.Media.Control,ContentType=WindowsRuntime]',
  "$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]",
  'function Await($op, $t) { $m = $asTask.MakeGenericMethod($t); $x = $m.Invoke($null, @($op)); $x.Wait(-1) | Out-Null; $x.Result }',
  '$mgr = Await ([Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager]::RequestAsync()) ([Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager])',
]

// Prints the current session as one JSON line every 2s; `{}` when nothing plays.
const WATCH = [
  ...PREAMBLE,
  'while ($true) {',
  "  $line = '{}'",
  '  try {',
  '    $s = $mgr.GetCurrentSession()',
  '    if ($null -ne $s) {',
  '      $p = Await ($s.TryGetMediaPropertiesAsync()) ([Windows.Media.Control.GlobalSystemMediaTransportControlsSessionMediaProperties])',
  '      $t = $s.GetTimelineProperties()',
  '      $line = [pscustomobject]@{ app = $s.SourceAppUserModelId; status = [string]$s.GetPlaybackInfo().PlaybackStatus; artist = $p.Artist; title = $p.Title; posMs = [long]$t.Position.TotalMilliseconds; endMs = [long]$t.EndTime.TotalMilliseconds; stampMs = $t.LastUpdatedTime.ToUnixTimeMilliseconds() } | ConvertTo-Json -Compress',
  '    }',
  '  } catch { }',
  '  [Console]::Out.WriteLine($line)',
  '  [Console]::Out.Flush()',
  '  Start-Sleep -Seconds 2',
  '}',
]

export type Control = 'toggle' | 'next' | 'prev'

const CALLS: Record<Control, string> = {
  toggle: 'TryTogglePlayPauseAsync',
  next: 'TrySkipNextAsync',
  prev: 'TrySkipPreviousAsync',
}

const PS = ['powershell.exe', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command']

export const WATCHER_ARGV: readonly string[] = [...PS, WATCH.join('\n')]

// Prints `ok` when the player accepted the command, `no` when it refused, `none` with no session.
export function controlArgv(action: Control): string[] {
  const script = [
    ...PREAMBLE,
    '$s = $mgr.GetCurrentSession()',
    "if ($null -eq $s) { 'none'; return }",
    `$ok = Await ($s.${CALLS[action]}()) ([bool])`,
    "if ($ok) { 'ok' } else { 'no' }",
  ]

  return [...PS, script.join('\n')]
}

// What `/np <word>` means. Undefined for a word it doesn't know.
export function parseControl(word: string): Control | undefined {
  const w = word.trim().toLowerCase()

  if (['', 'pause', 'play', 'toggle', 'pp'].includes(w)) {
    return 'toggle'
  }

  if (['next', 'skip', 'n', '>'].includes(w)) {
    return 'next'
  }

  if (['prev', 'previous', 'back', 'p', '<'].includes(w)) {
    return 'prev'
  }

  return undefined
}
