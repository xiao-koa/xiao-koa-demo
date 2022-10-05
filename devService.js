const chokidar = require("chokidar");
const path = require("path");
const fs = require("fs");
const esbuild = require("esbuild");

const fork = require("child_process").fork;

let filesPathArr = [];

/**
 *
 * @param {*} basePath 文件地址
 * @param {*} originPath 文件的哪一层
 * @param {*} targetPath 拷贝到哪一层
 */
function copyFile(basePath, originPath, targetPath) {
  let rootPath = basePath.split(originPath)[0];
  let truePath = basePath.split(originPath)[1];

  if (!fs.existsSync(path.join(rootPath, targetPath))) {
    fs.mkdirSync(path.join(rootPath, targetPath));
  }

  let a = truePath.split("\\");
  a.shift();
  a.pop();

  a.map((item) => {
    if (!fs.existsSync(path.join(rootPath, targetPath, item))) {
      fs.mkdirSync(path.join(rootPath, targetPath, item));
    }
  });

  fs.copyFileSync(basePath, path.join(rootPath, targetPath, truePath));
}

function getFiles(dir) {
  const stat = fs.statSync(dir);

  if (stat.isDirectory()) {
    const dirs = fs.readdirSync(dir);
    dirs.forEach((value) => {
      getFiles(path.join(dir, value));
    });
  } else if (stat.isFile()) {
    if (path.extname(dir) !== ".ts" && path.extname(dir) !== ".js") {
      copyFile(dir, "src", "lib");
    } else {
      filesPathArr.push(dir);
    }
  }
}

/**
 * 删除目录及目录下所有的文件
 * @param {string} filePath (需要删除文件夹的地址)
 */

function removeDir(filePath) {
  let statObj = fs.statSync(filePath); // fs.statSync同步读取文件状态，判断是文件目录还是文件。
  if (statObj.isDirectory()) {
    //如果是目录
    let dirs = fs.readdirSync(filePath); //fs.readdirSync()同步的读取目标下的文件 返回一个不包括 '.' 和 '..' 的文件名的数组['b','a']
    dirs = dirs.map((dir) => path.join(filePath, dir)); //拼上完整的路径
    for (let i = 0; i < dirs.length; i++) {
      // 深度 先将儿子移除掉 再删除掉自己
      removeDir(dirs[i]);
    }
    fs.rmdirSync(filePath); //删除目录
  } else {
    fs.unlinkSync(filePath); //删除文件
  }
}

getFiles(path.join(process.cwd(), "./src"));

esbuild
  .build({
    entryPoints: [...filesPathArr],
    bundle: false,
    outdir: "lib",
    platform: "node",
    format: "cjs",
    target: "node14",
    plugins: [],
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

let appService = fork(path.join(process.cwd(), "lib/index.js"));

appService.on("error", (err) => {
  console.log(err);

  process.exit(0);
});

appService.on("message", () => {
  console.log("服务启动成功！！！");
});

chokidar.watch("src").on("unlink", (event) => {
  if (path.extname(event) !== ".ts" && path.extname(event) !== ".js") {
    if (fs.existsSync(path.join("lib", event.split("src")[1]))) {
      fs.unlinkSync(path.join("lib", event.split("src")[1]));
    }
  } else {
    if (
      fs.existsSync(
        path.join("lib", event.split("src")[1].split(".ts")[0] + ".js")
      )
    ) {
      fs.unlinkSync(
        path.join("lib", event.split("src")[1].split(".ts")[0] + ".js")
      );
    }
  }
});

chokidar.watch("src").on("unlinkDir", (event) => {
  if (fs.existsSync(path.join("lib", event.split("src")[1]))) {
    removeDir(path.join("lib", event.split("src")[1]));
  }
});

chokidar.watch("src").on("add", (event) => {
  if (path.extname(event) !== ".ts" && path.extname(event) !== ".js") {
    copyFile(path.resolve(event), "src", "lib");
  } else {
    require("esbuild")
      .build({
        entryPoints: [event],
        bundle: false,
        outfile: "lib" + event.split("src")[1].split(".ts")[0] + ".js",
        platform: "node",
        format: "cjs",
        target: "node14",
        plugins: [],
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }
});

chokidar.watch("src").on("addDir", (event) => {
  if (!fs.existsSync(path.join("lib", event.split("src")[1]))) {
    fs.mkdirSync(path.join("lib", event.split("src")[1]));
  }
});

chokidar.watch("src").on("change", (event) => {
  if (path.extname(event) !== ".ts" && path.extname(event) !== ".js") {
    appService.kill();
    copyFile(path.resolve(event), "src", "lib");
    appService = fork("lib/index.js");
  } else {
    appService.kill();

    require("esbuild")
      .build({
        entryPoints: [event],
        bundle: false,
        outfile: "lib" + event.split("src")[1].split(".ts")[0] + ".js",
        platform: "node",
        format: "cjs",
        target: "node14",
        plugins: [],
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });

    appService = fork("lib/index.js");
  }
});
