install:
	npm install

run:
	npx babel-node -- 'src/bin/gendiff.js' -f pretty ../before.json ../after.json

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test --watch