yarn test

if($LASTEXITCODE -eq 0) {
    
    yarn build
    yarn minify
    npm pack --pack-destination .\\packs\\
    npm publish

} else {

    Write-Output 'Build aborted because tests failed.'
    exit 1;

}