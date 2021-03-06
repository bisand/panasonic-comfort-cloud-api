#!/bin/sh

DEV_BRANCH_NAME="develop"
MASTER_BRANCH_NAME="master"
RELEASE_TYPE="$1"

confirm() {
    # call with a prompt string or use a default
    read -r -p "${1:-Are you sure? [y/N]} " response
    case "$response" in
        [yY][eE][sS]|[yY])
            true
            ;;
        *)
            false
            ;;
    esac
}

execute() {
    npm install
    echo "Performing ${RELEASE_TYPE} release preparations..."
    if npm version ${RELEASE_TYPE} -m "Release version %s"
    then
        echo "NPM version done. Proceeding with git operations..."
        if git add . &&
            git push &&
            git push --tags
        then
            echo "Changes merged to ${MASTER_BRANCH_NAME} branch and pushed to origin."
            true
        else
            echo "Failed to merge to ${MASTER_BRANCH_NAME} branch and push to origin."
            false
        fi
    else
        echo "NPM version failed!"
        false
    fi
}

run() {
    if confirm && execute
    then
        echo "Successfully completed!"
    else
        echo "Failed to complete!"
    fi
}

if [ "${RELEASE_TYPE}" = "patch" ] || [ "${RELEASE_TYPE}" = "minor" ] || [ "${RELEASE_TYPE}" = "major" ] ||
    [ "${RELEASE_TYPE}" = "prepatch" ] || [ "${RELEASE_TYPE}" = "preminor" ] || [ "${RELEASE_TYPE}" = "premajor" ] || [ "${RELEASE_TYPE}" = "prerelease" ]
then
    run
else
    echo "'${RELEASE_TYPE}' is not a valid release type. Please use 'patch', 'minor', 'major', 'prepatch', 'preminor' or 'premajor'"
fi
