module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "style", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "test", release: "patch" },
        ],
        parserOpts: {
          headerPattern:
            "^\\[kakao-map-components\\]\\s*(?<type>\\w*)(?:\\((?<scope>[\\w\\-\\.\\/ ]*)\\))?\\:\\s*(?<subject>.*)$",
          headerCorrespondence: ["type", "scope", "subject"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        parserOpts: {
          headerPattern:
            "^\\[kakao-map-components\\]\\s*(?<type>\\w*)(?:\\((?<scope>[\\w\\-\\.\\/ ]*)\\))?\\:\\s*(?<subject>.*)$",
          headerCorrespondence: ["type", "scope", "subject"],
        },
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
