# Reverb launchd Service

## Service identity
- Label: `com.herd.reverb`
- Plist: `~/Library/LaunchAgents/com.herd.reverb.plist`

## Runtime
- PHP binary: `/Users/developert/Library/Application Support/Herd/bin/php84`
- Command: `php84 artisan reverb:start --host=0.0.0.0 --port=8080 --no-interaction`
- Working dir: `/Users/developert/Herd/manager`
- Logs stdout: `/tmp/reverb.stdout.log`
- Logs stderr: `/tmp/reverb.stderr.log`

## Useful commands
```bash
# Status (PID and last exit code)
launchctl list | grep reverb

# Start / stop
launchctl load   ~/Library/LaunchAgents/com.herd.reverb.plist
launchctl unload ~/Library/LaunchAgents/com.herd.reverb.plist

# Check port
lsof -iTCP:8080 -sTCP:LISTEN

# Tail logs
tail -f /tmp/reverb.stdout.log /tmp/reverb.stderr.log
```

## Multi-app config
Additional Laravel projects connect to this shared Reverb server by:
1. Adding their app credentials to `config/reverb.php` → `apps.apps[]` in the manager project.
2. Setting these env vars in the other project's `.env`:
   ```
   REVERB_APP_ID=<their-app-id>
   REVERB_APP_KEY=<their-app-key>
   REVERB_APP_SECRET=<their-app-secret>
   REVERB_HOST=manager.test
   REVERB_PORT=443
   REVERB_SCHEME=https
   ```
3. The Herd Nginx proxy for manager.test forwards WebSocket traffic from port 443 → 8080.

## Notes
- `KeepAlive true` means launchd restarts Reverb automatically on crash.
- If port 8080 is already occupied on load, `unload`, kill the stale process, then `load` again.
- The service starts at login (`RunAtLoad true`), no manual start needed after reboot.
