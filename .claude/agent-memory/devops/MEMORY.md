# DevOps Agent Memory

## Key Infrastructure Files
- Reverb launchd plist: `~/Library/LaunchAgents/com.herd.reverb.plist`
- Reverb logs: `/tmp/reverb.stdout.log`, `/tmp/reverb.stderr.log`

## Herd PHP Binaries
- PHP 8.4: `/Users/developert/Library/Application Support/Herd/bin/php84`
- Generic symlink (resolves to current default): `/Users/developert/Library/Application Support/Herd/bin/php`
- Herd bin dir: `/Users/developert/Library/Application Support/Herd/bin/`

## Reverb Setup (launchd)
- Manages: `com.herd.reverb` launchd service
- Binds to: `0.0.0.0:8080` (internal), exposed via Herd Nginx proxy as `manager.test:443`
- Working dir: `/Users/developert/Herd/manager`
- Commands: `launchctl load/unload ~/Library/LaunchAgents/com.herd.reverb.plist`
- Restart: `launchctl unload ... && launchctl load ...`
- Details: [reverb-launchd.md](reverb-launchd.md)
