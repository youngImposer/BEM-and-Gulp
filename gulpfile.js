//  Подключенные модули  gulp 
const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
// const svgSprites = require("gulp-svg-sprites");
const svgSprite = require("gulp-svg-sprite");
const	svgmin = require("gulp-svgmin");
const	cheerio = require("gulp-cheerio");
const	replace = require("gulp-replace");
const cache = require("gulp-cache");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();






let params = {
  out: 'build',
  htmlSrc: 'index.pink.html',
  levels: ['common.blocks', 'pink.blocks']
};

// Файлы для подключения в строгом порядке:

// let jsFiles = [
//   // "./source/js/lib.js",
//   // "./node_modules/slick-carousel/slick/slick.js",
//   // "./node_modules/magnific-popup/dist/jquery.magnific-popup.js",
//   "./source/js/main.js",
// ];


// TASKS
// Task для браузера
gulp.task('server', function() {
  browserSync.init({
    server: params.out
  });
  gulp.watch('*.html', gulp.series('html', 'styles')); 

});

gulp.task('html', function() {
  return gulp.src(params.htmlSrc)
    .pipe(rename('index.html'))
    .pipe(gulp.dest(params.out))
    .pipe(browserSync.stream());
});


// Task на стили CSS 

gulp.task('styles', function() {
  return gulp.src(['source/common.blocks/**/*.css', 'source/pink.blocks/**/*.css'])
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(params.out))
  .pipe(browserSync.stream());
  
});


// function styles() {
//   return gulp.src([
//     // Пишем все файлы, которые хотим объединить, в том порядке, в каком они будут располагаться в объединенном файле
//     // "./node_modules/normalize.css/normalize.css",
//     // "./node_modules/slick-carousel/slick/slick.css",
//     // "./node_modules/magnific-popup/dist/magnific-popup.css",
//     "./source/less/variables.less", 
//     "./source/less/mixins.less", 
//     "./source/less/scaffolding.less",
//     "./source/less/header.less",
//     "./source/less/nav.less",
//     "./source/less/close.less",
//     "./source/less/title.less",
//     "./source/less/text.less",
//     "./source/less/fithures.less",
//     "./source/less/hotel.less",
//     "./source/less/btn.less",
//     "./source/less/map.less",
//     "./source/less/footer.less",
//     "./source/less/section-header.less",
//     "./source/less/form.less",
//     "./source/less/photo.less",
//     "./source/less/video.less",

    
    
    
    
//   ])
//   .pipe(sourcemaps.init())    // инициализируем создание Source Maps
//   .pipe(plumber())
//   .pipe(concat("style.less"))
//   .pipe(gulp.dest("./source/less")) 
//   .pipe(less())
//   .pipe(autoprefixer({
//     overrideBrowserslist:  ["last 2 versions"],
//     cascade: false
//   }))
//   .pipe(gulp.dest("./build/css")) 
//   .pipe(cleanCSS({           // Минификация css 
//     level: 2
//   }))  
//   .pipe(rename("style.min.css"))
//   .pipe(sourcemaps.write(".")) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл main.min.css в самом конце
//   .pipe(gulp.dest("build/css"))
//   .pipe(browserSync.stream());
// }


// Task на скрипты JS 
// function scripts() {
//   return gulp.src(jsFiles)
//   // .pipe(sourcemaps.init()) // инициализируем создание Source Maps
//   .pipe(concat("script.js"))  // Объединение файлов в один
//   .pipe(gulp.dest("./source/js")) 
//   .pipe(uglify({
//     toplevel: true
//   }))
//   // .pipe(sourcemaps.write(".")) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл scripts.min.js в самом конце в формате комментария
//   .pipe(gulp.dest("./build/js"))
//   .pipe(browserSync.stream());
// } 


// Task на функцию del
// function clean() {
//   return del.sync("build") (function(cb) {
//     return cache.clearAll(cb);
//   });
// }

// function clean() {
//   return del(["build/*"]);
// }

// gulp.task('clear', function(){
//   // будем вручную запускать при необходимости очистки кэша
//   return cache.clearAll();
// });

// Task на функцию images

// gulp.task("images", function () { 
//   return gulp.src("source/img/**/*.{png,jpg,svg}") 
//   .pipe(cache(imagemin([ 
//     imagemin.optipng({optimizationLevel: 3}), 
//     imagemin.mozjpeg({progressive: true}), 
//     imagemin.svgo() 
//   ])))
//   .pipe(gulp.dest("build/img"))
//   .pipe(browserSync.stream());
// });


// Task на функцию webp
// function webpic() {
//   return gulp.src("build/img/**/*.{png, jpg, jpeg}")
//   .pipe(webp({quality: 90}))
//   .pipe(gulp.dest("build/img"));
// }


// Task на функцию watch

// function watch() {
//   browserSync.init({
//     server: 'params.out'
//     });
//   gulp.watch("./*.html", gulp.series("html")); 
//   gulp.watch("./*.html").on("change", browserSync.reload);  //  // Отслеживаем файлы html
// }


// TASKS ДЛЯ ВЫЗОВА ФУНКЦИЙ
// Task вызывающий функцию styles
// gulp.task("styles", styles);

// Task вызывающий функцию scripts
// gulp.task("scripts", scripts);

// Task вызывающий функцию очистки папки build 
// gulp.task("del", clean);

// Task вызывающий функцию минимизации картинок
// gulp.task("images", imgmin); 


// Task вызывающий функцию webp
// gulp.task("webp", webpic);


// Task для создания svg-спрайта Academy-модернизированный

// gulp.task("sprite", function () { 
//   return gulp.src("source/img/*.svg") 
//   // minify svg
//   .pipe(svgmin({
//     js2svg: {
//       pretty: true
//     }
//   }))
//   // remove all fill and style declarations in out shapes
//   .pipe(cheerio({
//     run: function ($) {
//       $('[fill]').removeAttr('fill');
//       $('[stroke]').removeAttr('stroke');
//       $('[style]').removeAttr('style');
//     },
//     parserOptions: { xmlMode: true }
//   }))
//   // cheerio plugin create unnecessary string ">', so replace it.
//   .pipe(replace("&gt;", ">"))

//   .pipe(svgstore({ 
//     inlineSvg: true 
//   }))
//   .pipe(rename("sprite.svg"))
//   .pipe(gulp.dest("build/img"));
// });


// Copying fonts, html, video

// gulp.task("fonts", function() {
//   return gulp.src("source/css/fonts/**/*")
//     .pipe(gulp.dest("build/css/fonts"));
// });



// gulp.task("video", function() {
//   return gulp.src("source/video/**/*")
//     .pipe(gulp.dest("build/video/"));
// });

// Task вызывающий функцию watch
// gulp.task("watch", watch);



gulp.task("build", gulp.series( "html"), function(done){
  done();
});

gulp.task("default", gulp.series("build", "server"));