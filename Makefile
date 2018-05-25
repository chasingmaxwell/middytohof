.PHONY: ci \
	commitmsg \
	prepublish \
	precommit \
	commitlint \
	commitlint-ci \
	build \
	documentation \
	lint \
	lint-staged \
	test \
	type

export FORCE_COLOR = true

ci: commitlint-ci lint type test
commitmsg: commitlint
prepublish: build
precommit: lint-staged type test

commitlint:
	yarn commitlint -e ${GIT_PARAMS}
commitlint-ci:
	yarn commitlint --from="${TRAVIS_BRANCH}" --to="${TRAVIS_COMMIT}"
	yarn commitlint --from=${TRAVIS_COMMIT}
build:
	yarn babel src -d lib	--delete-dir-on-start
documentation:
	yarn emdaer && git add *.md
lint:
	yarn eslint {,**/}{.*,*}.js --quiet
lint-staged:
	yarn lint-staged
test:
	yarn jest --coverage
type:
	yarn flow status
