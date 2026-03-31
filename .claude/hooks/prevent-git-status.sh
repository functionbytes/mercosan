#!/bin/bash
# Prevent excessive git status calls during Claude operations
# This hook disables automatic git status refresh during tool use

# Skip git status during these operations:
# - Read/Edit/Write operations (file content changes don't need git status immediately)
# - Test execution (git status not needed for running tests)
# - Code formatting (git status not needed for pint/prettier)

# Only allow git status during actual git operations:
# - git commit (need current status)
# - git stash (need current status)
# - git diff (need current status)

exit 0
