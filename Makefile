install:
	npm install

run:
	npx babel-node -- 'src/bin/gendiff.js' ../before.yaml ../after.yaml

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test --watch