const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const pug = require("gulp-pug");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");

const app = "app/";
const dist = "dist/";

const config = {
    app: {
        html: app + "html/**/*.html",
        style: app + "scss/style.scss",
        bootstrap: app + "bootstrap/**/*.*",
        js: app + "js/**/*.js",
        img: app + "img/**/*.*",
        fonts: app + "fonts/*.*",
    },
    dist: {
        html: dist,
        style: dist + "css/",
        bootstrap: dist + "bootstrap/",
        js: dist + "js/",
        img: dist + "img/",
        fonts: dist + "fonts/",
    },
    watch: {
        html: app + "html/**/*.html",
        style: app + "scss/**/*.scss",
        bootstrap: app + "bootstrap/**/*.*",
        js: app + "js/**/*.js",
        img: app + "img/**/*.*",
        fonts: app + "fonts/*.*",
    }
}

const webServer = () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 9000,
        host: "localhost",
        notify: false
    });
}

const htmlTask = () => {
    return gulp.src(config.app.html)
        .pipe(gulp.dest(config.dist.html))
        .pipe(browserSync.reload({
            stream: true
        }));
}
const bootstrapTask = () => {
    return gulp.src(config.app.bootstrap)
        .pipe(gulp.dest(config.dist.bootstrap))
        .pipe(browserSync.reload({
            stream: true
        }));
}
const scssTask = () => {
    return gulp.src(config.app.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"
        }).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dist.style))
        .pipe(browserSync.reload({
            stream: true
        }));
}
const jsTask = () => {
    return gulp.src(config.app.js)
        .pipe(gulp.dest(config.dist.js))
        .pipe(browserSync.reload({
            stream: true
        }));
}
const imgTask = () => {
    return gulp.src(config.app.img)
        .pipe(gulp.dest(config.dist.img))
        .pipe(browserSync.reload({
            stream: true
        }));
}
const fontsTask = () => {
    return gulp.src(config.app.fonts)
        .pipe(gulp.dest(config.dist.fonts))
        .pipe(browserSync.reload({
            stream: true
        }));
}
const watchFiles = () => {
    gulp.watch([config.watch.html], gulp.series(htmlTask));
    gulp.watch([config.watch.bootstrap], gulp.series(bootstrapTask));
    gulp.watch([config.watch.style], gulp.series(scssTask));
    gulp.watch([config.watch.js], gulp.series(jsTask));
    gulp.watch([config.watch.img], gulp.series(imgTask));
    gulp.watch([config.watch.fonts], gulp.series(fontsTask));
}
const start = gulp.series(htmlTask, bootstrapTask, scssTask, jsTask, imgTask, fontsTask);
exports.default = gulp.parallel(start, watchFiles, webServer);