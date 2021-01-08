import { src, dest, parallel, watch, series } from "gulp";
import plumber from "gulp-plumber";
import del from "del";
import pug from "gulp-pug";
import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import sass from "gulp-sass";
import minifyCss from "gulp-minify-css";
import uglify from "gulp-uglify";
import babel from "gulp-babel";
import imagemin from "gulp-imagemin";
import cache from "gulp-cache";

browserSync.create();

const options = {
  pug: {
    src: [
      "app/views/*.pug",
      "app/views/pages/*.pug",
      "app/views/!blocks/**",
      "app/views/!layout/**",
      "app/views/!components/**",
    ],
    all: "app/views/**/*.pug",
    dest: "build",
  },
  styles: {
    src: "app/styles/**/*.scss",
    dest: "build/styles",
  },
  scripts: {
    src: "app/scripts/**/*.js",
    dest: "build/scripts",
  },
  images: {
    src: "app/images/**/*.+(png|jpeg|jpg|gif|svg)",
    dest: "build/images",
  },
  fonts: {
    src: "app/fonts/*",
    dest: "build/fonts",
  },
};

const browsersync = (done) => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
    port: 4000,
  });
  done();
};

const views = () => {
  return src(options.pug.src)
    .pipe(
      plumber(function (err) {
        console.log("Pug Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(pug({ pretty: true }))
    .pipe(dest(options.pug.dest))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src(options.styles.src)
    .pipe(
      plumber(function (err) {
        console.log("Styles Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCss({ compatibility: "ie9" }))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
        grid: true,
        overrideBrowserslist: [""],
      })
    )
    .pipe(dest(options.styles.dest))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(options.scripts.src)
    .pipe(
      plumber(function (err) {
        console.log("Scripts Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(options.scripts.dest))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(options.images.src)
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(dest(options.images.dest))
    .pipe(browserSync.stream());
};

const fonts = () =>
  src(options.fonts.src)
    .pipe(dest(options.fonts.dest))
    .pipe(browserSync.stream());

const cleanOldBuildFile = async () => {
  return Promise.resolve(del.sync("build"));
};

const watchFiles = () => {
  watch(options.pug.all, views);
  watch(options.styles.src, styles);
  watch(options.scripts.src, scripts);
  watch(options.images.src, images);
  watch(options.fonts.src, images);
};

const buildFile = series(
  cleanOldBuildFile,
  parallel(views, styles, scripts, images, fonts)
);
const watchChange = parallel(watchFiles, browsersync);

exports.views = views;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.watch = watchChange;
exports.build = buildFile;
exports.default = buildFile;
