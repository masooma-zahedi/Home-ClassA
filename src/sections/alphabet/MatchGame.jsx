import React, { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';
import {cards} from "./LearnNewWords";

// خوراکی کمپینگ
// const items1 = [
//   { id: 1, word: 'ساندِویچ', image: 'https://www.sargento.com/assets/Uploads/Recipe/Image/Sargento11501.jpg' },
//   { id: 2, word: 'کُنسِروِ ماهی', image: 'https://100jewishfoods.tabletmag.com/wp-content/uploads/2018/02/tuna-fish.jpg' },
//   { id: 3, word: 'بُطری آب', image: 'https://dayapolymercaspian.com/wp-content/uploads/2019/05/293f571bace5aea56074a1106afe3842.jpg' },
//   { id: 4, word: 'مارشمالو', image: 'https://www.finedininglovers.com/sites/default/files/body_images/marshmallows-what-are%C2%A9iStock.jpg' },
//   { id: 5, word: 'میوِه خُشک', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6HQNf43QNPQjfDv86t7pHFhWweeCEpHbpA&s' },
//   { id: 6, word: 'چای', image: 'https://goodricketea.com/cdn/shop/articles/IMAGE-2.png?v=1686659498' },
//   { id: 7, word: 'نوشابه', image: 'https://mykathmandukitchen.com/wp-content/uploads/2018/03/coke-all1.png' },
//   { id: 8, word: 'کُلوچه', image: 'https://harnika.ir/wp-content/uploads/2022/10/koloche-ahari-min.jpg' },
//   { id: 9, word: 'نان ', image: 'https://cdn.vectorstock.com/i/1000v/53/07/thanksgiving-baked-bread-cartoon-colored-clipart-vector-43185307.jpg' },
//   { id: 10, word: 'بیسکویت', image: 'https://www.shutterstock.com/image-vector/illustration-on-theme-big-set-600nw-1530904565.jpg' }
// ];

// وسایل کمپینگ
// const items2 = [
//   { id: 1, word: 'چادُر', image: 'https://classroomclipart.com/image/static7/preview2/small-backpacking-tent-clip-art-59364.jpg' },
//   { id: 2, word: 'کوله‌پُشتی', image: 'https://i.ebayimg.com/images/g/xEYAAOSw4P9lFi~c/s-l1200.png' },
//   { id: 3, word: 'چِراغ ', image: 'https://cdn.outsideonline.com/wp-content/uploads/2018/08/17/barebones-canyon-light_s.jpg' },
//   { id: 4, word: 'کیسه خواب', image: 'https://m.media-amazon.com/images/I/61X+v2ij6KL._AC_UF1000,1000_QL80_.jpg' },
//   { id: 5, word: 'اُجاقِ گاز', image: 'https://sarvkooh.ir/wp-content/uploads/2021/04/125-6.jpg' },
//   { id: 6, word: 'قُمقُمه', image: 'https://www.overlanded.com/wp-content/uploads/2023/02/vessel-32-oz-stainless-steel-camping-water-bottle-tuff-stuff-overland-ts-8-1100-6.webp' },
//   { id: 7, word: 'پَتو', image: 'https://kodiakcanvas.com/cdn/shop/files/1351_Main__73673.1637789104.1280.1280.jpg?v=1701717233&width=1214' },
//   { id: 8, word: 'فَندک', image: 'https://images.thdstatic.com/productImages/3e3fe8a9-efac-4ed9-a3bb-5fdee54a2da7/svn/bic-lighters-ump4dc-ast-64_1000.jpg' },
//   { id: 9, word: 'نَقشه', image: 'https://media.gettyimages.com/id/165586562/vector/treasure-map-cartoon.jpg?s=1024x1024&w=gi&k=20&c=gnkFtgjNxJMXYpE3brL_CEOcHCTpy3YcLDWUhD_vSlU=' },
//   { id: 10, word: 'کَفشِ کوه', image: 'https://www.shutterstock.com/image-vector/hiking-shoes-boots-vector-illustration-260nw-354922850.jpg' }
// ];

// طبیعت
// const items3 = [
//   { id: 1, word: 'جَنگَل', image:'https://foodtank.com/wp-content/uploads/2015/09/agroforestry-FAO.jpg'},
//   { id: 2, word: 'دِرَخت', image:'https://www.fertilome.com/media/klowrey/Article%20Images/Tree.jpg'},
//   { id: 3, word: 'کوه', image:'https://upload.wikimedia.org/wikipedia/commons/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg'},
//   { id: 4, word: 'رودخانه', image:'https://img.redbull.com/images/c_crop,x_0,y_0,h_3840,w_5760/c_fill,w_800,h_539/q_auto,f_auto/redbullcom/2024/9/18/uarvhdfxqihzmnyddkoo/adrian-mattern-kayak-ivindo-gabon'},
//   { id: 5, word: 'دَریاچِه', image:'https://t4.ftcdn.net/jpg/04/30/46/87/360_F_430468753_hjeCITV6815pAztrEiOyElhwCao4v6XS.jpg'},
//   { id: 6, word: 'خورشید', image:'https://static.scientificamerican.com/sciam/cache/file/A53E2873-F8D7-48F7-8DD5FB9F5B32A420_source.jpg?w=1200'},
//   { id: 7, word: 'اَبر', image:'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15788040/20150428-cloud-computing.0.1489222360.jpg?quality=90&strip=all&crop=0,15.095986038394,100,69.808027923211'},
//   { id: 8, word: 'سِتارِه', image:'https://imageio.forbes.com/specials-images/imageserve/6724a083c587bccd03d3b5a9/0x0.jpg?format=jpg&crop=3077,1729,x1272,y0,safe&height=600&width=1200&fit=bounds'},
//   { id: 9, word: 'ماه', image: 'https://images.newscientist.com/wp-content/uploads/2024/06/27164847/SEI_210650080.jpg' },
//   { id: 10, word: 'بیابان', image: 'https://cdn.prod.website-files.com/5f58a077d654db1a689fd95b/60ab777e17b2c9be9058c96c_picfair-01350937-dunes-and-desert-landscape-of-namib-fu-PREVIEW-ONLY.jpg' }
// ];

// صبحانه
// const itemsFood = [
//   { id: 3, word: 'پَنیر', image: 'https://img.freepik.com/premium-vector/cartoon-drawing-cheese-with-face-it_602454-7870.jpg' },
//   { id: 4, word: 'تُخم‌مُرغ', image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/509fefb5-bf9c-42d5-934a-0425d8612e11/eadbd16b-14a1-4191-809e-34232364e071.png' },
//   { id: 5, word: 'مُرَبا', image: 'https://icon2.cleanpng.com/ci2/gzz/iut/aqru265v3.webp' },
//   { id: 6, word: 'کَرِه', image: 'https://thumbs.dreamstime.com/z/cartoon-butter-cutting-board-margarine-spread-natural-dairy-product-vector-brick-wooden-high-calorie-food-cooking-225918083.jpg' },
//   { id: 7, word: 'عَسَل', image: 'https://t4.ftcdn.net/jpg/06/12/86/49/360_F_612864989_v6TrLkbttR4sjm9vj7bMvtTxO7Xw4ZXY.jpg' },
//   { id: 8, word: 'گِردو', image: 'https://e7.pngegg.com/pngimages/836/823/png-clipart-walnut-transparency-walnut-food-desktop-wallpaper.png' },
//   { id: 9, word: 'چای', image: 'https://img.freepik.com/premium-vector/cartoon-illustration-cup-tea-with-smiley-face_180868-3002.jpg?w=360' },
//   { id: 10, word: 'آب‌میوه', image: 'https://img.freepik.com/premium-vector/orange-fruit-juice-vector-logo_1306769-453.jpg' },
//   { id: 12, word: 'خامِه', image: 'https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-meringue-cream-icon-cartoon-vector-png-image_4691580.png' },
//   { id: 19, word: 'ماست', image: 'https://www.shutterstock.com/image-vector/spoon-yogurt-vector-illustration-600nw-1396014698.jpg' },
// ];

// حمل و نقل
// const transport1 = [
//   { id: 1, word: 'ماشین', image: 'http://i.pinimg.com/474x/07/ef/87/07ef878fdd9734f674ce709bfb6523be.jpg' },
//   { id: 2, word: 'اتوبوس', image: 'https://www.citypng.com/public/uploads/preview/white-cartoon-illustration-bus-7040816948746366ehecfbrpq.png' },
//   { id: 3, word: 'قطار', image: 'https://static.vecteezy.com/system/resources/previews/033/520/223/non_2x/train-cartoon-illustration-train-train-engine-train-cartoon-train-cartoon-cartoon-ai-generative-png.png' },
//   { id: 4, word: 'هواپیما', image: 'https://img.freepik.com/free-vector/airplane-cartoon-sticker-white-background_1308-76926.jpg?semt=ais_hybrid&w=740' },
//   { id: 5, word: 'قایق', image: 'https://media.istockphoto.com/id/2150065784/vector/cute-sailing-ship-marine-transport-clipart-vector-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=upvS-ntka7jrD27TTxM6Z6N08hHdH9aA_KzRKqpabpE=' },
//   { id: 6, word: 'دوچرخه', image: 'https://www.clker.com/cliparts/9/2/a/5/1217862219992805751lescinqailes_bicycle.svg.hi.png' },
//   { id: 7, word: 'تاکسی', image: 'https://t3.ftcdn.net/jpg/04/74/98/04/360_F_474980460_iR8TN3ev27lpeg8tZVu1plboDfew2j5W.jpg' },
//   { id: 8, word: 'کشتی', image: 'https://i.pinimg.com/736x/6d/c3/79/6dc3792181622a60cf04c512af0e78a7.jpg' },
//   { id: 9, word: 'کامیون', image: 'https://img.freepik.com/premium-vector/cartoon-truck-trailer-isolated-vehicle-vector-illustration_939711-4064.jpg?semt=ais_hybrid&w=740' },
//   { id: 10, word: 'موتور', image: 'https://t3.ftcdn.net/jpg/06/08/99/08/360_F_608990870_yAJaCtKKmmhU7jiSuAS8ZxsdL5VlA9ZM.jpg' }
// ];


// const diningTableItems = [
//   { id: 1, word: 'بشقاب', image: 'https://cdn.pixabay.com/photo/2012/04/13/01/39/plate-31732_640.png' },
//   { id: 2, word: 'قاشق', image: 'https://img.freepik.com/premium-vector/cartoon-spoon-vector-illustration-cooking-designs_1138840-4464.jpg' },
//   { id: 3, word: 'چنگال', image: 'https://t4.ftcdn.net/jpg/10/43/71/15/360_F_1043711536_EeQ5oQvMidA4xEv5ZLnt4zAYsZ8N19pt.jpg' },
//   { id: 4, word: 'کارد', image: 'https://img.freepik.com/free-vector/floating-knife-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-premium-vector_138676-5784.jpg' },
//   { id: 5, word: 'لیوان', image: 'https://img.freepik.com/premium-vector/hand-drawn-glass-cartoon-vector-illustration-clipart-white-background_191095-41097.jpg' },
//   { id: 6, word: ' دستمال کاغذی', image: 'https://static.vecteezy.com/system/resources/previews/014/504/574/non_2x/box-with-napkins-icon-cartoon-style-vector.jpg' },
//   { id: 9, word: 'پارچ آب', image:'https://img.freepik.com/premium-photo/cartoon-pitcher-with-blue-handle-white-background-generative-ai_1034058-50154.jpg'},
//   { id: 11, word: 'کاسه', image: 'https://img.freepik.com/free-vector/blue-bowl-from-goldilocks-story_1308-168955.jpg?semt=ais_items_boosted&w=740' },
//   { id: 13, word: 'نمکدان', image: 'https://static.vecteezy.com/system/resources/previews/027/565/570/non_2x/salt-shaker-bottle-seasoning-container-cartoon-vector.jpg' },
//   { id: 15, word: 'سینی', image: 'https://www.shutterstock.com/image-vector/cartoon-food-tray-icon-vector-260nw-2588075195.jpg' }
// ];

// const bathItems = [
//   { id: 1, word: 'صابون', image: 'https://www.shutterstock.com/image-vector/soap-bubbles-260nw-187215893.jpg' },
//   { id: 3, word: 'لیف', image: 'https://media.istockphoto.com/id/1371070501/vector/purple-shower-loofah-cartoon-bath-mesh-sponge.jpg?s=612x612&w=0&k=20&c=a2ZgaNp9--EvSGl6LNgW6F7iNdWSRQ816yigek4jPZI=' },
//   { id: 4, word: 'حوله', image: 'https://www.shutterstock.com/image-vector/cartoon-home-kitchen-towel-isolated-600nw-95509165.jpg' },
//   { id: 6, word: 'خمیردندان', image: 'https://png.pngtree.com/png-clipart/20230307/ourmid/pngtree-toothpaste-cartoon-png-image_6635972.png' },
//   { id: 7, word: 'تیغ اصلاح', image: 'https://thumbs.dreamstime.com/b/creative-sticker-cartoon-disposable-razor-original-150936137.jpg' },
//   { id: 8, word: 'آینه', image: 'https://cdn.pixabay.com/photo/2022/09/08/22/57/mirror-7442023_960_720.png' },
//   { id: 10, word: 'سطل زباله', image: 'https://thumbs.dreamstime.com/z/cartoon-trash-can-20097337.jpg' },
//   { id: 12, word: 'پادری', image: 'https://img.kwcdn.com/product/fancy/fdea41db-2986-4acf-afc9-58d85b45d29c.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' },
//   { id: 13, word: 'وان حمام', image: 'https://as2.ftcdn.net/jpg/02/97/22/83/1000_F_297228382_4NN3RAuZTdc4A0qZWyBexgsVt6BLOFwJ.jpg' },
//   { id: 15, word: 'دوش', image: 'https://t4.ftcdn.net/jpg/01/23/78/13/360_F_123781353_rLB4kTmqwgoWpW0YNBjGN8Vu99PCFXIw.jpg' }
// ];

// const schoolSupplies = [
//   { id: 1, word: "قیچی", image: "https://charatoon.com/photo/10081.png" },
//   { id: 2, word: "خط کش", image: "https://i.pinimg.com/736x/07/04/cd/0704cda084fddf29a8d40a447977d422.jpg" },
//   { id: 3, word: "صندلی", image: "https://thumbs.dreamstime.com/b/d-rendering-school-chair-isolated-white-background-ideal-education-classroom-furniture-related-themes-cartoon-366915616.jpg" },
//   { id: 4, word: "کاغذ", image: "https://img.freepik.com/premium-vector/hand-drawn-paper-cartoon-illustration_23-2151474658.jpg" },
//   { id: 5, word: "چسب", image: "https://png.pngtree.com/png-clipart/20250531/original/pngtree-cute-cartoon-glue-bottle-school-supplies-adhesive-craft-png-image_21103651.png" },
//   { id: 6, word: "خودکار", image: "https://img.pixers.pics/pho_wat(s3:700/FO/24/26/87/32/700_FO24268732_c18e5e8a5fd6dafd334266cad5337614.jpg,358,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,138,650,jpg)/wall-murals-pen-cartoon.jpg.jpg" },
//   { id: 7, word: "ماژیک", image: "https://cdn.vectorstock.com/i/500p/19/21/cheerful-cartoon-marker-pen-vector-51341921.jpg" },
//   { id: 8, word: "پاک‌کن", image: "https://thumbs.dreamstime.com/z/cartoon-happy-eraser-illustration-53892555.jpg" },
//   { id: 9, word: "کیف", image: "https://t4.ftcdn.net/jpg/15/14/49/97/360_F_1514499759_4ws45WRpsZvVJvGmbCP5iE5jNXoYgrbj.jpg" },
//   { id: 10, word: "مداد", image: "https://i.etsystatic.com/40533556/r/il/b58af9/6112668721/il_1080xN.6112668721_qfn0.jpg" },
// ];

// برای داستان پاییز و خارپشت
// const paeezVaKharposht = [
//   { id: 1, word: "برگ", image: "https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-cute-fall-leaves-clipart-various-autumn-leaves-set-cartoon-vector-png-image_6867180.png" },
//   { id: 2, word: "خارپشت", image: "https://thumbs.dreamstime.com/b/cute-animated-hedgehog-illustration-cartoon-style-design-hedgehog-cute-animated-hedgehog-illustration-cartoon-363412797.jpg" },
//   { id: 3, word: "درخت", image: "https://i.pinimg.com/736x/fe/fe/44/fefe4472da490edabdf71bd471352f15.jpg" },
//   { id: 4, word: "پاییز", image: "https://t4.ftcdn.net/jpg/11/49/68/49/360_F_1149684918_BajC4EcED7p8GH45HN4pOLcHxURgW8mj.jpg" },
//   { id: 5, word: "زمین", image: "https://img.freepik.com/free-vector/low-point-view-nature-landscape_1308-92523.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 6, word: "رنگی", image: "https://png.pngtree.com/thumb_back/fh260/background/20240104/pngtree-vibrant-cartoon-texture-a-playful-and-colorful-background-image_13880204.png" },
//   { id: 7, word: "استراحت", image: "https://media.istockphoto.com/id/933020166/vector/cute-cartoon-boy-sleep-in-bed-good-dream-rest-character-vector-illustration.jpg?s=170667a&w=0&k=20&c=CV5uGI7uD7HDJWcPSDuhhRoxU08e9yhBP9_z5GD01us=" },
//   { id: 8, word: "بهار", image: "https://as2.ftcdn.net/jpg/02/56/61/45/1000_F_256614501_8ng35vnx4tr5MvH564fLZRrSynSeyP7w.jpg" },
//   { id: 9, word: "شاد", image: "https://c8.alamy.com/comp/G39KKD/vector-illustration-of-happy-man-cartoon-G39KKD.jpg" },
//   { id: 10, word: "غمگین", image: "https://cdn.pixabay.com/photo/2025/07/01/17/42/ai-generated-9691043_1280.png" },
// ];

// const classG =[
//   { id: 1, word: "ا", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-الف-1.jpg` },
//   { id: 2, word: "ب", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-ب-1.png` },
//   { id: 3 , word: "ت", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-ت-1.png` },
//   { id: 4 , word: "د", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-د-1.png` },
//   { id: 5 , word: "ر", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-ر-1.png` },
//   { id: 6 , word: "س", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-س-1.png` },
//   { id: 7 , word: "ش", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/10-22-2-ش.png` },
//   { id: 8 , word: "ک", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/11-1-1-ک.png` },
//   { id: 9, word: "م", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/11-1-1-م.png` },
//   { id: 10, word: "ن", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/11-1-1-ن.png` },
//   { id: 11, word: "ز", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/08-10-ز-3.png` },
//   { id: 12, word: "ل", image: `${process.env.PUBLIC_URL}/images/assetAlpha/cardAlpha/exampleAlpha/11-1-4-ل.png` },
// ]

// برای رنگ ها
// const colorsLearning = [
//   { id: 1, word: "لباس قرمز", color: "قرمز", image: "https://img.magnific.com/premium-vector/red-dress-with-gold-trim-gold-bow-front_1187092-51523.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 2, word: "توپ زرد", color: "زرد", image: "https://cdn.vectorstock.com/i/500p/93/17/yellow-water-polo-ball-vector-13579317.jpg" },
//   { id: 3, word: "سیب سبز", color: "سبز", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpa_ao2LYPcQD5t_KNTluVcLyU89AgZnlhOA&s" },
//   { id: 4, word: "ماشین آبی", color: "آبی", image: "https://classroomclipart.com/image/static7/preview2/blue-car-cartoon-clipart-48174.jpg" },
//   { id: 5, word: "بادکنک صورتی", color: "صورتی", image: "https://static.vecteezy.com/system/resources/previews/020/641/861/non_2x/bundle-of-pink-flying-helium-balloons-isolated-cartoon-illustration-vector.jpg" },
//   { id: 6, word: "خرس قهوه‌ای", color: "قهوه‌ای", image: "https://classroomclipart.com/image/static8/preview2/happy-brown-bear-sitting-and-smiling-in-cartoon-style-78702.jpg" },
//   { id: 7, word: "ابر سفید", color: "سفید", image: "https://as2.ftcdn.net/jpg/02/46/98/69/1000_F_246986936_4InndMgg5SEBXEDIi1vmjvbygQODccZX.jpg" },
//   { id: 8, word: "گربه نارنجی", color: "نارنجی", image: "https://png.pngtree.com/png-clipart/20250606/original/pngtree-cute-cartoon-orange-tabby-cat-illustration-vector-png-image_21132603.png" },
//   { id: 9, word: "کلاه بنفش", color: "بنفش", image: "https://img.magnific.com/premium-vector/hand-drawn-cap-cartoon-illustration_23-2150903764.jpg" },
//   { id: 10, word: "مداد سیاه", color: "سیاه", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP817fV2fJ3XrhD2_rZb8rBSXqD3wyxKlFlg&s" }
// ];

// موقعیت ها
// const positionsLearning = [
//   { id: 1, word: "جلوی خانه", english: "in front of the house", image: "https://thumbs.dreamstime.com/b/cartoon-young-couple-newborn-son-front-house-illustration-45759513.jpg" },
//   { id: 2, word: "پشت درخت", english: "behind the tree", image: "https://static.vecteezy.com/system/resources/previews/016/059/278/non_2x/cute-little-kids-looking-out-from-behind-the-tree-vector.jpg" },
//   { id: 3, word: "کنار ماشین", english: "next to the car", image: "https://www.shutterstock.com/shutterstock/photos/602567222/display_1500/stock-vector-man-stand-near-the-car-602567222.jpg" },
//   { id: 4, word: "بین دو صندلی", english: "between two chairs", image: "https://files.idyllic.app/files/static/3714056?width=256&optimizer=image" },
//   { id: 5, word: "روی میز", english: "on the table", image: "https://as1.ftcdn.net/jpg/02/93/57/88/1000_F_293578817_UXstpLVvqePWYHIoSCHvcYwpApPQFBcZ.jpg" },
//   { id: 6, word: "زیر میز", english: "under the table", image: "data:image/jpeg;base64,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" },
//   { id: 7, word: "داخل جعبه", english: "in the box", image: "https://png.pngtree.com/png-clipart/20241229/original/pngtree-a-little-girl-inside-box-cartoon-pic-png-image_18245072.png" },
//   { id: 8, word: "بیرون جعبه", english: "outside the box", image: "https://static.vecteezy.com/system/resources/previews/007/106/846/non_2x/preposition-of-place-with-cartoon-girl-and-a-box-free-vector.jpg" },
//   { id: 9, word: "بالای کوه", english: "on top of the mountain", image: "https://media.istockphoto.com/id/1609191084/vector/young-hiker-with-arms-raised-on-top-of-the-mountain.jpg?s=612x612&w=0&k=20&c=_X4ss7Z6wwvgOFisOiAWfRhN_whGlGKpy8KG_Loh6DE=" },
//   { id: 10, word: "پایین پله", english: "at the bottom of the stairs", image: "https://www.shutterstock.com/image-vector/cute-children-climbing-stairs-cartoon-260nw-2240507949.jpg" }
// ];

// احساسات
// const feelingsLearning = [
//   { id:1, word:"خوشحال", english:"happy", image:"https://img.pikbest.com/illustration/20250626/joyful-cartoon-children-jumping-playful-illustration-happy-kids-cheerful-mood_11769926.jpg!sw800" },
//   { id:2, word:"ناراحَت", english:"sad", image:"https://media.istockphoto.com/id/538258297/vector/sad-child-vector-illustration.jpg?s=612x612&w=0&k=20&c=mEzjrYNYMdaWPABa-hz_zlRYGztrGvTBkL9V5lEVs7A=" },
//   { id:3, word:"خَستِه", english:"tired", image:"https://t3.ftcdn.net/jpg/19/36/43/92/360_F_1936439211_uiT0DD4mGNGdkoouVQsjLgiPKCFJuRNz.jpg" },
//   { id:4, word:"تَرسیدِه", english:"scared", image:"https://t4.ftcdn.net/jpg/02/52/17/73/360_F_252177352_L0auLyOzwroKMG9Hhc5BWYHfSDwZPa4b.jpg" },
//   { id:5, word:"عَصَبانی", english:"angry", image:"https://thumbs.dreamstime.com/b/vibrant-cartoon-illustration-young-boy-having-tantrum-character-depicted-angry-facial-expression-shouting-407470595.jpg" },
//   { id:6, word:"مَریض", english:"sick", image:"https://media.istockphoto.com/id/1169998028/vector/sick-child-in-bed.jpg?s=612x612&w=0&k=20&c=ISxhTYHjDQB0sYs17KvJmZWdN1fKsmsG9qiTceWra5g=" },
//   { id:7, word:"بی‌حوصِلِه", english:"bored", image:"https://thumbs.dreamstime.com/b/bored-schoolboy-school-boy-hand-face-sitting-desk-writing-his-notebook-194257197.jpg" },
//   { id:8, word:"هَیَجان‌زَدِه", english:"excited", image:"https://freedesignfile.com/upload/2020/02/Cartoon-happy-kids-and-pencil-room-playing-vector.jpg" },
//   { id:9, word:"خِجالَتی", english:"shy", image:"https://i.etsystatic.com/33464617/r/il/0a8f62/3640018786/il_570xN.3640018786_7evu.jpg" },
//   { id: 10, word: "اِستِرِس", english: "nervous", image: "https://www.shutterstock.com/image-vector/horrified-little-boy-vector-cartoon-260nw-2039128397.jpg" }
// ];

// آب و هوا
// const weatherLearning = [
// { id:1, word:"آفتابی", english:"sunny", image:"https://static.vecteezy.com/system/resources/previews/007/637/871/non_2x/cute-summer-sunny-day-weather-character-smiling-with-clouds-in-yellow-background-illustration-vector.jpg" },
// { id:2, word:"بارانی", english:"rainy", image:"https://img.freepik.com/free-vector/nature-raining-scene_1308-22369.jpg" },
// { id:3, word:"بَرفی", english:"snowy", image:"https://thumbs.dreamstime.com/b/cold-weather-boy-freezing-shivering-young-winter-cartoon-style-illustration-landscape-115782671.jpg" },
// { id:4, word:"بادی", english:"windy", image:"https://t3.ftcdn.net/jpg/07/25/45/18/360_F_725451899_HXqF8T8cUpTdg8DyhfVu1Qle0jhvJPH5.jpg" },
// { id:5, word:"گَرم", english:"hot", image:"https://www.shutterstock.com/image-vector/person-suffering-summer-sun-heat-600nw-2356554209.jpg" },
// { id:6, word:"اَبری", english:"cloudy", image:"https://img.freepik.com/free-photo/anime-style-clouds_23-2151071731.jpg?semt=ais_hybrid&w=740" },
// { id:7, word:"توفان", english:"storm", image:"https://t3.ftcdn.net/jpg/03/22/97/22/360_F_322972200_yN6Lz4k7uLZAnOs3pt3ODmLL0vHgBUJ0.jpg" },
// { id:8, word:"رَنگین‌کَمان", english:"rainbow", image:"https://st4.depositphotos.com/31862216/38693/v/450/depositphotos_386930238-stock-illustration-beautiful-rainbow-sky-paper-art.jpg" },
// { id:9, word:"رَعد و بَرق", english:"thunder and lightning", image:"https://www.shutterstock.com/image-photo/children-a-boy-girl-aged-260nw-2639401605.jpg" },
// { id:10, word:"مِه‌آلود", english:"foggy", image:"https://img.freepik.com/free-vector/dirt-road-foggy-forest-dull-weather-cartoon-nature-landscape-with-road-going-along-field-coni_107791-7449.jpg" }
// ];

// احساسات غذا
const foodFeelingsLearning = [
  {
    id: 1,
    word: "خوردن",
    english: "Eating",
    image: "https://thumbs.dreamstime.com/b/illustration-cartoon-kids-eating-pizza-together-cartoon-kids-eating-pizza-together-110663012.jpg"
  },
  {
    id: 2,
    word: "گُرسنه",
    english: "Hungry",
    image: "https://img.magnific.com/premium-vector/cute-boy-was-thinking-choosing-junk-food-healthy-food-vector-illustration_723224-4029.jpg?w=360"
  },
  {
    id: 3,
    word: "سیر",
    english: "Full",
    image: "https://thumb.ac-illust.com/60/60198944d426d7f83dc2418413ff7390_w.jpeg"
  },
  {
    id: 4,
    word: "خوشمزه",
    english: "Delicious",
    image: "https://img.magnific.com/free-photo/people-eating-sweet-delicious-cake_23-2151534316.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 5,
    word: "تند",
    english: "Spicy",
    image: "https://en.pimg.jp/080/738/220/1/80738220.jpg"
  },
  {
    id: 6,
    word: "تشنه",
    english: "Thirsty",
    image: "https://thumbs.dreamstime.com/b/boy-drinking-water-21936024.jpg"
  },
  {
    id: 7,
    word: "بدش آمد",
    english: "Dislike",
    image: "https://thumbs.dreamstime.com/b/vector-illustration-boy-refuse-to-eat-broccoli-tomatoes-fried-eggs-233556931.jpg"
  },
  {
    id: 8,
    word: "دل‌درد",
    english: "Stomach ache",
    image: "https://media.istockphoto.com/id/2245916257/vector/child-suffering-after-eating-junk-food-vector-illustration.jpg?s=612x612&w=0&k=20&c=EiazgMJOiDMeyeIhAPSfEVNUyu1BWXNZl7HZvSxb5QI="
  },
  {
    id: 9,
    word: "چشیدن",
    english: "tasting",
    image: "https://thumbs.dreamstime.com/b/girl-eating-soup-spoon-cheerful-young-enjoys-bowl-green-displaying-happy-expression-seated-table-perfect-419464250.jpg"
  },
  {
    id: 10,
    word: "همکاری",
    english: "cooprate",
    image: "https://media.istockphoto.com/id/1327389819/vector/mother-and-son-cooking-in-the-kitchen.jpg?s=612x612&w=0&k=20&c=TNibgC7TXVsKcACToxFt8O9YOfJdHfL0HnNDOAOml00="
  }
];

// اتاق نشیمن
const livingRoomLearning = [
  {
    id: 1,
    word: "مُبل",
    english: "Sofa",
    image: "https://cdn.creativefabrica.com/2023/05/31/Sofa-cartoon-icon-Couch-with-color-cush-Graphics-71024176-1-1-580x387.png"
  },
  {
    id: 2,
    word: "تِلِویزیون",
    english: "Television",
    image: "https://e7.pngegg.com/pngimages/871/734/png-clipart-television-furniture-room-home-illustration-tv-cabinet-electronics-cartoon-thumbnail.png"
  },
  {
    id: 3,
    word: "میـز",
    english: "Table",
    image: "https://static4.depositphotos.com/1000750/275/v/450/depositphotos_2758752-stock-illustration-table.jpg"
  },
  {
    id: 4,
    word: "صَندَلی",
    english: "Chair",
    image: "https://thumbs.dreamstime.com/b/wooden-chair-flat-vector-clipart-illustration-isolated-background-wooden-chair-flat-vector-clipart-illustration-isolated-431835030.jpg"
  },
  {
    id: 5,
    word: "چِراغ",
    english: "Lamp",
    image: "https://www.shutterstock.com/image-vector/floor-lamp-on-long-stalk-260nw-491408488.jpg"
  },
  {
    id: 6,
    word: "فَرش",
    english: "Carpet",
    image: "https://static.vecteezy.com/system/resources/previews/067/223/621/non_2x/hand-drawn-cartoon-illustration-of-a-carpet-free-png.png"
  },
  {
    id: 7,
    word: "پَنجَرِه",
    english: "Window",
    image: "https://static.vecteezy.com/system/resources/thumbnails/012/849/945/small/window-to-nature-scene-vector.jpg"
  },
  {
    id: 8,
    word: "دَر",
    english: "Door",
    image: "https://thumbs.dreamstime.com/b/inviting-cartoon-door-sparkling-stars-greenery-front-entrance-ai-generated-412736379.jpg"
  },
  {
    id: 9,
    word: "کِتاب",
    english: "Book",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHtaTfKx31bpSzx1MwgN8Qk3rAQSSQ6f86dQ&s"
  },
  {
    id: 10,
    word: "تابلو",
    english: "Picture",
    image: "https://media.istockphoto.com/id/545585228/vector/pictures-gallery.jpg?s=612x612&w=0&k=20&c=g5W6VxfvwIWQ7qTy0Mzi0xArS2XrxESqvEQa0KHOrvE="
  }
];





const MatchGame = ({}) => {
    const [items,setItems] = useState(foodFeelingsLearning);
  const[idModal,setIdModal]=useState('foodFeelingsLearning');
  const [newtitle,setNewtitle] = useState(false)

  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [turnIndex, setTurnIndex] = useState(0);
  const [data, setData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [alert, setAlert] = useState('');
  const [winner, setWinner] = useState(null);


// ************get data for game from LearnNewWords**************

  const partBody = cards.filter((w)=>w.category === "اعضای بدن");
  const insects = cards.filter((w)=>w.category === "حشرات");
  const healthy = cards.filter((w)=>w.category === "سلامتی");
  const animal1 = cards.filter((w)=>w.category === "حیوانات");
  const animal2 = cards.filter((w)=>w.category === "حیوانات 2");
  const jobs = cards.filter((w)=>w.category === "شغل‌ها");

//make data for collections
const createNewData = (dataArray, extraTiles = []) => {
  return dataArray.map(item => ({
    id: nanoid(),
    word: item.word,
    image: item.image,
  }));
};

// function for cards data
const createNewDataCards = (dataArray,) => {
  return dataArray.map(item => ({
    id: nanoid(),
    word: item.persianWord,
    image: item.image,
  }));
};

const insect1= createNewDataCards(insects)
const partBody1= createNewDataCards(partBody)
const healthy1= createNewDataCards(healthy)
const animal11= createNewDataCards(animal1)
const animal21= createNewDataCards(animal2)
const jobs1= createNewDataCards(jobs)

// categories for titles *********************************************** Categories**************
const categories = [
  // { title: "خوراکی کمپینگ", data: items1, key: "item1" },
  // { title: "وسایل کمپینگ", data: items2, key: "item2" },
  // { title: "طَبیعَت", data: items3, key: "item3" },
  // { title: "صبحانه", data: itemsFood, key: "item4" },
  // { title: "حمل و نقل", data: transport1, key: "item5" },
  // { title: "میز غذاخوری", data: diningTableItems, key: "item6" },
  // { title: "وسایل حمام", data: bathItems, key: "item7" },
  // { title: "وسایل مدرسه", data: schoolSupplies, key: "item8" },
  // { title: "پاییز و خارپشت", data: paeezVaKharposht, key: "item9" },
  // { title: "حشرات", data: insect1, key: "item10" },
  // { title: "اعضای بدن", data: partBody1, key: "item11" },
  // { title: "سلامتی", data: healthy1, key: "item12" },
  // { title: "حیوانات 1", data: animal11, key: "item13" },
  // { title: "حیوانات 2", data: animal21, key: "item14" },
  // { title: "شغل ها", data: jobs1, key: "item15" },
  // { title: "classG", data: classG, key: "item16" },
  // { title: "رنگ ها", data: colorsLearning, key: "item17" },
  // { title: "موقعیت ها", data: positionsLearning, key: "item18" },
  // { title: "احساسات", data: feelingsLearning, key: "item19" },
  // { title: "آب و هوا", data: weatherLearning, key: "item20" },
  { title: "احساسات غذا", data: foodFeelingsLearning, key: "item21" },
  // { title: "اتاق نشیمن", data: livingRoomLearning, key: "item22" },
];


  // 

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (matchedIds.length === items.length) {
      const maxScore = Math.max(...players.map(p => p.score));
      const topPlayers = players.filter(p => p.score === maxScore);
      if (topPlayers.length === 1) {
        setWinner(topPlayers[0]);
      } else {
        setWinner({ name: 'همه برنده‌اند! 🎉', score: maxScore });
      }
    }
  }, [matchedIds]);

  const resetGame = () => {
    const shuffled = shuffleArray([...items.map(i => ({ ...i, type: 'image' })), ...items.map(i => ({ ...i, type: 'word' }))]);
    setData(shuffled);
    setMatchedIds([]);
    setSelectedCards([]);
    setTurnIndex(0);
    setPlayers(players.map(p => ({ ...p, score: 0 })));
    setDisableClicks(false);
    setAlert('');
    setWinner(null);
    setNewtitle(false)
  };

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handlePlayerSubmit(e) {
    e.preventDefault();
    if (!currentPlayer.trim()) {
      setAlert('لطفاً نام بازیکن را وارد کنید.');
      return;
    }
    if (!players.find(p => p.name === currentPlayer)) {
      setPlayers([...players, { name: currentPlayer, score: 0 }]);
    }
    setCurrentPlayer('');
    setAlert('');
  }

  function handleCardClick(item) {
    if (players.length === 0) {
      setAlert('اول بازیکن‌ها را اضافه کنید.');
      return;
    }
    if (disableClicks || matchedIds.includes(item.id)) return;
    if (selectedCards.find(card => card.index === item.index)) return;

    const newSelected = [...selectedCards, item];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setDisableClicks(true);

      const [first, second] = newSelected;
      if (first.id === second.id && first.type !== second.type) {
        setMatchedIds([...matchedIds, first.id]);
        setPlayers(prev => {
          const updated = [...prev];
          updated[turnIndex].score += 1;
          return updated;
        });
        setTimeout(() => {
          setSelectedCards([]);
          setDisableClicks(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
          setTurnIndex((prev) => (prev + 1) % players.length);
          setDisableClicks(false);
        }, 1000);
      }
    }
  }

  // new change *****************************
    const stylebg = {
    backgroundColor:'rgba(232, 231, 231, 0.99)'
    
  }
// test
  const questionsqq = (e, i) => {
    // setItems([]);
    setItems(e);
    setIdModal(i);
    setNewtitle(true)
    setPlayers([]);
    setCurrentPlayer('');
    setData([]);
  setTurnIndex(0);
  setSelectedCards([]);
  setMatchedIds([]);
  setDisableClicks(false);
  setAlert('');
  setWinner(null);
};



  return (
    <div className=" mt-5  border border-info" style={{backgroundColor:" #f3a4af82"}}>
              {/* masooma */}
        {/*Start modal for titles */}
        <div className="border border-success container text-end p-3">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#'+idModal}>
            فهرست
          </button>
  
          <div class="modal fade" id={idModal} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  <h1 class="modal-title fs-5" id="exampleModalLabel" > فهرست مطالب  </h1>
                </div>
                <div className="modal-body" style={{backgroundColor:" #f3a4af82"}}>
                  <div className="d-flex flex-wrap">
                    {categories.map((item) => (
                      <button
                        key={item.key}
                        className="btn shadow-sm border m-2"
                        style={stylebg}
                        onClick={() => questionsqq(item.data, item.key)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End modal for titles */}



      <div className="container border border-warning p-4">
        <h2 className="mb-3">🎮 بازی جفت‌سازی کلمه و تصویر</h2>

        {alert && <div className="alert alert-warning">{alert}</div>}

        <form onSubmit={handlePlayerSubmit} className="mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="نام بازیکن"
            value={currentPlayer}
            onChange={(e) => setCurrentPlayer(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">افزودن بازیکن</button>
        </form>

        {players.length > 0 && (
          <div className="mb-3">
            <strong>نوبت: </strong> {players[turnIndex]?.name}
            <ul className="mt-2">
              {players.map((p, i) => (
                <li key={i}>{p.name} — امتیاز: {p.score}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="row g-3">
          {data.map((item, index) => {
            if(index < 21){
              
            }
            const isFlipped =
              matchedIds.includes(item.id) ||
              selectedCards.find(c => c.word === item.word && c.type === item.type);

            return (
              <div className="col-3" key={index} onClick={() => handleCardClick({ ...item, index })}>
                <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}> 
                  <div className="flip-card-inner">
                    <div className="flip-card-front bg-light d-flex align-items-center justify-content-center fw-bold fs-3">
                      {index + 1}
                    </div>
                    <div className="flip-card-back bg-success text-white d-flex align-items-center h1 justify-content-center">
                      {item.type === 'word' ? (
                        <strong>{item.word}</strong>
                      ) : (
                        <img className='h-100 w-100' src={item.image} alt={item.word} style={{  }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {winner && (
          <div className="alert alert-success mt-4 winner-alert animate__animated animate__bounceIn">
            🏆 <span className="display-5">برنده بازی: <strong>{winner.name}</strong></span>
            <div className="fs-4">با {winner.score} امتیاز! 🎁 جایزه‌ات مبارک!</div>
          </div>
        )}

        <button className="btn btn-danger mt-4" onClick={resetGame}>{newtitle == true ? `شروع بازی ` : 'ریست بازی'}</button>

        <style jsx>{`
          .flip-card {
            background-color: transparent;
            width: 100%;
            height: 150px;
            perspective: 1000px;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }

          .flipped .flip-card-inner {
            transform: rotateY(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .flip-card-back {
            transform: rotateY(180deg);
          }

          .winner-alert {
            text-align: center;
            background: linear-gradient(to right, #fceabb, #f8b500);
            color: #222;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 6px 16px rgba(0,0,0,0.3);
          }
        `}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
      </div>
    </div>
  );
};

export default MatchGame;
