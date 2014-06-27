#!/bin/sh

if [ ! \( "$1" -a "$2" \) ]; then
	printf "Usage: eslint-patch <REF> <REF>\n"
	exit 1
fi

which -s eslint || {
	printf "Error: looks like eslint is not installed\n"
	printf "         npm install -g eslint\n"
	exit 1
}

git status > /dev/null 2>&1 || {
	printf "Error: looks like you are not within a Git project!\n"
	exit 1
}

git rev-parse --verify --quiet "$1" > /dev/null 2>&1 || {
	printf "Error: $1 is not a valid commit\n"
	exit 1
}

git rev-parse --verify --quiet "$2" > /dev/null 2>&1 || {
	printf "Error: $2 is not a valid commit\n"
	exit 1
}

root=$(git rev-parse --show-toplevel);
files=$(git diff --name-status "$1" "$2" | egrep -v '^D' | egrep '\.js$' | cut -f 2);

cd "$root"

for file in $files; do
	eslint --rulesdir "node_modules/flashstock-eslint/rules" "$file"
done