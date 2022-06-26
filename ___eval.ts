#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

interface Context {
    verbose: boolean,
    veryVerbose: boolean,
    swaggerFilePath: string,
}

const renameOrDeleteOrigin = (origin: string, dest: string) => {
    if(fs.existsSync(dest)) {
        log(`Deleting`, origin);
        fs.unlinkSync(origin)
    } else {
        log('Renaming', origin, 'to', dest);
        fs.renameSync(origin, dest);
    }
}

const renameRepositories = () => {
    log('\nFixing repository names');
    const baseFolder = './src/main/java/com/acrontum/template/repositories';
    fs.readdirSync(baseFolder)
        .filter(file => file.endsWith('Repositorie.java'))
        .forEach(file => {
            const [fileName, extension] = file.split('.');
            const fixedName = fileName.replace('Repositorie', 'Repository');
            renameOrDeleteOrigin(path.join(baseFolder, file), path.join(baseFolder, `${fixedName}.${extension}`));
        });
}

const renameTestFiles = () => {
    const packages = ['./src/test/java/com/acrontum/template/controllers', './src/test/java/com/acrontum/template/services'];
    for(let currentPackage of packages) {
        log('\nAdding Test suffix to', currentPackage);
        fs.readdirSync(currentPackage)
            .filter(file => ! file.includes('Test'))
            .forEach(file => {
                const [fileName, extension] = file.split('.');
                renameOrDeleteOrigin(path.join(currentPackage, file), path.join(currentPackage, `${fileName}Test.${extension}`));
            })
    }
}

const renameDtos = () => {
    log('\nFixing repository names');
    const baseFolder = './src/main/java/com/acrontum/template/dtos';
    fs.readdirSync(baseFolder)
        .filter(file => file.endsWith('.java') && ! file.includes('Dto'))
        .forEach(file => {
            const [fileName, extension] = file.split('.');
            const fixedName = fileName + 'Dto';
            log('Renaming', fileName, 'to', `${fixedName}.${extension}`);
            fs.renameSync(path.join(baseFolder, file), path.join(baseFolder, `${fixedName}.${extension}`));
        });
}

const renameModels = () => {
    log('\nFixing Models');
    const baseFolder = './src/main/java/com/acrontum/template/models';
    fs.readdirSync(baseFolder)
        .filter(file => file.endsWith('Model.java'))
        .forEach(file => {
            const [fileName, extension] = file.split('.');
            const fixedName = fileName.replace(/Model/g, '');
            renameOrDeleteOrigin(path.join(baseFolder, file), path.join(baseFolder, `${fixedName}.${extension}`));
        });
}

const copySwaggerFile = (swaggerPath: string) => {
    const destination = './src/main/resources/static/swagger.yml';
    fs.copyFileSync(swaggerPath, destination);
    log('\nSwagger file copied to', destination);
}

const completeGitIgnore = () => {
    fs.appendFileSync('.gitignore', '\n### Generate-it ###\n.openapi-nodegen\n');
}

let log = (... data: any[]): void => {};

const main = (ctx: Context) => {
    log = ctx.verbose || ctx.veryVerbose ? console.log : log;

    log('Applying changes for Java Spring Template');
    renameRepositories();
    renameTestFiles();
    renameDtos();
    renameModels();
    copySwaggerFile(ctx.swaggerFilePath);
    completeGitIgnore();
    log('All changes for Java Spring Template are done.')
}

export default main;