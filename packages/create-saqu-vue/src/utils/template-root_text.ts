export const getRoot_text = (name: string) => ({
  'package.json': `
{
  "name": "root",
  "private": true,
  "scripts": {
    "prepare": "husky install",
    "----${name}----": "--------start-------",
    "build": "npm run-script build --workspace ${name}",
    "watch": "npm run-script watch --workspace ${name}",
    "start": "npm run-script start --workspace website",
    "version": "lerna version --force-publish=* --no-changelog --no-git-tag-version --no-push",
    "prettier": "prettier --write \\"**/*.{js,jsx,tsx,ts,less,md,json}\\"",
    "remove": "lerna exec \\"rm -rf node_modules build  package-lock.json\\"",
    "clean": "lerna clean --yes && npm run remove"
  },
  "dependencies": {
    "husky": "~8.0.0",
    "lerna": "~5.4.0",
    "prettier": "~2.7.0",
    "pretty-quick": "~3.1.3",
    "lint-staged": "~13.0.0",
    "tsbb": "~4.1.3"
  },
  "lint-staged": {
    "*.{js,jsx,tsx,ts,less,md,json}": "prettier --write"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "workspaces": [
    "core",
    "website"
  ]
}
  `,
  'lerna.json': `
{
  "version": "0.0.0",
  "packages": ["core", "website"]
}

  `,
  '.prettierrc': `
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 120,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}

  `,
  '.prettierignore': `
**/*.md
**/*.svg
**/*.ejs
**/*.yml
package.json
node_modules
dist
build
lib
esm
test
  `,
  '.gitignore': `
# Created by https://www.gitignore.io/api/node
# Edit at https://www.gitignore.io/?templates=node

esm
cjs
lib
es
package-lock.json
__snapshots__


### Node ###
# Logs
logs
*.log
yarn.lock
package-lock.json
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

dist

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# End of https://www.gitignore.io/api/node

.DS_Store
.cache
.vscode
.idea
.env

*.bak
*.tem
*.temp
#.swp
*.*~
~*.*

# IDEA
*.iml
*.ipr
*.iws
.idea/
  `,
  '.husky/_/.gitignore': `*`,
  '.husky/_/husky.sh': `
#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi

  exit $exitCode
fi

  `,
  '.husky/pre-commit': `
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
  `,
  '.github/workflows/publish.yml': `
name: Build & Deploy
on:
  push:
    branches:
      - main

env:
  SKIP_PREFLIGHT_CHECK: true

jobs:
  build-deploy:
    runs-on: ubuntu-22.04
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 16

    - name: Generate changelog
      uses: jaywcjlove/changelog-generator@main
      with:
        token: \${{ secrets.GITHUB_TOKEN }}
        filter-author: (SunLxy|dependabot\\[bot\\]|Renovate Bot)
        filter: '[R|r]elease[d]\\s+[v|V]\d(\\.\\d+){0,2}'

    - run: npm install
    - run: npm run build

    - name: Create Tag
      id: create_tag
      uses: jaywcjlove/create-tag-action@main
      with:
        token: \${{ secrets.GITHUB_TOKEN }}
        package-path: ./core/package.json

    - name: Generate changelog
      id: changelog
      uses: jaywcjlove/changelog-generator@main
      if: steps.create_tag.outputs.successful
      with:
        token: \${{ secrets.GITHUB_TOKEN }}
        head-ref: \${{ steps.create_tag.outputs.version }}
        filter-author: (SunLxy|dependabot\[bot\]|Renovate Bot)
        filter: '[R|r]elease[d]\\s+[v|V]\\d(\\.\\d+){0,2}'

    - name: Create Release
      uses: ncipollo/release-action@v1
      if: steps.create_tag.outputs.successful
      with:
        token: \${{ secrets.GITHUB_TOKEN }}
        name: \${{ steps.create_tag.outputs.version }}
        tag: \${{ steps.create_tag.outputs.version }}
        body: |
          \`\`\`bash
          npm i ${name}@\${{ steps.create_tag.outputs.version }}
          \`\`\`
          \${{ steps.changelog.outputs.compareurl }}
          \${{ steps.changelog.outputs.changelog }}

    - name: Publish 🚀
      uses: SunLxy/npm-publish@main
      with:
        token: \${{ secrets.NPM_TOKEN }}
        workspaces: |
          core

  `,
});
