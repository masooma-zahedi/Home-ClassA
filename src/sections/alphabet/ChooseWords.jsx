import React, { useMemo, useState } from "react";

export default function ChooseWords() {

const categories = [
  {
    id: "house",
    title: " خانه",
    words: [
  { id: 1, word: "خانه", english: "House", image: "https://thumbs.dreamstime.com/b/bring-touch-playful-charm-to-any-space-delightful-cartoon-house-illustration-ideal-kids-rooms-vibrant-377160933.jpg" },
  { id: 2, word: "دَر", english: "Door", image: "https://thumbs.dreamstime.com/b/inviting-cartoon-door-sparkling-stars-greenery-front-entrance-ai-generated-412736379.jpg" },
  { id: 3, word: "پَنجَرِه", english: "Window", image: "https://png.pngtree.com/png-clipart/20241231/original/pngtree-window-clipart-png-image_18423026.png" },
  { id: 4, word: "دیوار", english: "Wall", image: "https://t3.ftcdn.net/jpg/07/61/48/92/360_F_761489217_DFALX8AIvnlgNUUnVdyIKt3rZGjcU95f.jpg" },
  { id: 5, word: "سَقف", english: "Roof", image: "https://thumbs.dreamstime.com/b/image-shows-red-roof-chimney-brown-siding-vector-illustration-design-house-clipart-370036757.jpg" },
  { id: 6, word: "اُتاق", english: "Room", image: "https://t4.ftcdn.net/jpg/08/92/33/15/360_F_892331542_FtSSfHwOQo8nFhHANjy8Lka7V9BVQxCU.jpg" },
  { id: 7, word: "میز", english: "Table", image: "https://cdn.vectorstock.com/i/1000v/03/82/cartoon-wooden-tables-isola-vector-21650382.jpg" },
  { id: 8, word: "صَندَلی", english: "Chair", image: "https://t4.ftcdn.net/jpg/00/54/26/03/360_F_54260333_QQ40rdrUKnnyjDPi8Lkt2jYIZNYlZnxq.jpg" },
  { id: 9, word: "کاناپِه", english: "Sofa", image: "https://img.magnific.com/free-vector/green-two-seater-sofa-isolated-white-background_1308-77164.jpg?semt=ais_hybrid&w=740&q=80" },
  { id: 10, word: "تِلِویزیون", english: "TV", image: "https://www.shutterstock.com/image-vector/tv-illustration-isolated-icon-cartoon-260nw-1341508154.jpg" },
  { id: 11, word: "کولِر", english: "Air Conditioner", image: "https://static.vecteezy.com/system/resources/previews/004/595/196/non_2x/air-conditioner-with-remote-control-electronic-home-concept-in-cartoon-illustration-vector.jpg" },
  { id: 12, word: "لامپ", english: "Lamp", image: "https://png.pngtree.com/png-clipart/20240719/original/pngtree-gradient-cartoon-doodle-of-a-bed-side-lamp-png-image_15593015.png" },
  { id: 13, word: "فَرش", english: "Carpet", image: "https://img.magnific.com/premium-vector/colorful-cartoon-indoor-rug-icon-floor-carpet_1310786-24907.jpg" },
  { id: 14, word: "کابینِت", english: "Cabinet", image: "https://img.freepik.com/premium-photo/cabinet-2d-cartoon-illustraton-white-background-high-qu_889056-32396.jpg" },
  { id: 15, word: "آیینِه", english: "Mirror", image: "https://png.pngtree.com/png-clipart/20240719/original/pngtree-cartoon-framed-old-mirror-png-image_15590026.png" }
]
  },
// احساسات
//   {
//     id: "emotions",
//     title: "احساسات",
//     words: [
//   { id: 1, word: "خوشحال", english: "Happy", image: "https://img.magnific.com/premium-vector/joyful-cartoon-girl-with-pigtails-bright-outfit_1308-182684.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 2, word: "ناراحَت", english: "Sad", image: "https://t3.ftcdn.net/jpg/01/77/92/22/360_F_177922297_xRVO9hTpQojF64TH4CZkaRCBupk0PDfC.jpg" },
//   { id: 3, word: "عَصَبانی", english: "Angry", image: "https://static.vecteezy.com/system/resources/previews/055/408/082/non_2x/angry-cartoon-boy-vector.jpg" },
//   { id: 4, word: "تَرسیدِه", english: "Scared", image: "https://t3.ftcdn.net/jpg/05/33/20/94/360_F_533209438_M0bMmZZlWkHcetQyTTGz8W2wzjoqMQms.jpg" },
//   { id: 5, word: "خَستِه", english: "Tired", image: "https://thumbs.dreamstime.com/b/fat-man-jogging-tired-vector-illustration-31019325.jpg" },
//   { id: 6, word: "هَیَجان‌زَدِه", english: "Excited", image: "https://img.magnific.com/premium-vector/boy-burst-out-laughing-cartoon-vector-illustration_1080480-152670.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 7, word: "آرام", english: "Calm", image: "https://png.pngtree.com/png-vector/20230728/ourlarge/pngtree-calm-clipart-girl-calm-in-meditation-to-find-peace-and-calm-vector-png-image_6800967.png" },
//   { id: 8, word: "خَجالَتی", english: "Shy", image: "https://thumbs.dreamstime.com/b/cute-shy-cheerful-little-girl-blue-dress-cartoon-illustration-42433598.jpg" },
//   { id: 9, word: "مِهرَبان", english: "Kind", image: "https://static.vecteezy.com/system/resources/previews/001/330/343/non_2x/be-kind-slogan-with-cartoon-girl-with-little-deer-vector.jpg" },
//   { id: 10, word: "نِگَران", english: "Worried", image: "https://c8.alamy.com/comp/R1K7PB/english-vocabulary-of-worried-illustration-R1K7PB.jpg" },
//   { id: 12, word: "غُرور", english: "Proud", image: "https://thumbs.dreamstime.com/b/smiling-person-holding-be-proud-sign-placard-vector-cartoon-stick-figure-illustration-banner-character-221621893.jpg" },
//   { id: 13, word: "دوست‌داشتَنی", english: "Lovely", image: "https://img.magnific.com/free-vector/cute-valentines-day-animal-couple_52683-53993.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 15, word: "مُتِعَجِب", english: "Surprised", image: "https://static.vecteezy.com/system/resources/previews/055/758/221/non_2x/surprised-girl-cartoon-illustration-shocked-transparent-background-free-png.png" }
// ]
//   },
// لباس ها
//   {
//     id: "clothes",
//     title: " لباس‌ها",
//     words:[
//   { id: 1, word: "پیراهن", english: "Shirt", image: "https://img.magnific.com/premium-vector/shirt-cartoon_119631-405.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 2, word: "شَلوار", english: "Pants", image: "https://png.pngtree.com/png-vector/20240312/ourmid/pngtree-blue-jeans-short-pant-cartoon-mascot-png-image_11934424.png" },
//   { id: 3, word: "کَفش", english: "Shoes", image: "https://img.magnific.com/free-vector/hand-drawn-running-shoes-cartoon-illustration_23-2150961844.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 4, word: "جوراب", english: "Socks", image: "https://thumbs.dreamstime.com/b/pair-cartoon-socks-blue-striped-red-bear-design-391363958.jpg" },
//   { id: 5, word: "کُلاه", english: "Hat", image: "https://cdn.pixabay.com/photo/2022/11/20/20/53/hat-7605221_1280.png" },
//   { id: 6, word: "کُت", english: "Jacket", image: "https://img.magnific.com/premium-photo/cartoon-illustration-hooded-jacket-with-hoodie-generative-ai_733139-92119.jpg?semt=ais_hybrid&w=740&q=80" },
//   { id: 7, word: "دامَن", english: "Skirt", image: "https://i.pinimg.com/736x/fb/67/db/fb67db78fac33221955b99cd659d4a95.jpg" },
//   { id: 8, word: "دَستکِش", english: "Gloves", image: "https://static.vecteezy.com/system/resources/previews/011/634/636/non_2x/children-gloves-and-cartoon-person-child-glove-hand-with-finger-winter-clothing-and-protection-knitted-symbol-warm-clothes-and-warm-pair-mitt-mitten-baby-wear-and-christmas-activity-concept-vector.jpg" },
//   { id: 9, word: "شال", english: "Scarf", image: "https://t4.ftcdn.net/jpg/16/02/77/11/360_F_1602771127_Uo4OZmJIYUyS3Eohj2v93honlnMnzVjj.jpg" },
//   { id: 10, word: "یونیفورم", english: "Uniform", image: "https://cdn.vectorstock.com/i/1000v/61/24/cartoon-japanese-girl-school-uniform-vector-38216124.jpg" },
//   { id: 11, word: "تی‌شِرت", english: "T-shirt", image: "https://www.fivebelow.com/image/upload/product/9160348_01.jpg" },
//   { id: 12, word: "کَتان", english: "Jeans", image: "https://thumbs.dreamstime.com/b/denim-jeans-clothes-cartoon-illustration-isolated-white-background-denim-jeans-clothes-cartoon-illustration-isolated-white-375848781.jpg" },
//   { id: 13, word: "لِباس", english: "Clothes", image: "https://static.vecteezy.com/system/resources/previews/021/677/379/non_2x/cartoon-color-different-summer-fashion-clothes-set-vector.jpg" },
//   { id: 14, word: "بارانی", english: "Raincoat", image: "https://img.magnific.com/free-vector/happy-boy-wearing-raincoat_1308-134791.jpg" },
// ]
//   },
// بهداشت
//   {
//     id: "hygiene",
//     title: "بهداشت",
//     words:  [
//   { id: 1, word: "صابون", english: "Soap", image: "https://thumbs.dreamstime.com/z/soap-16057006.jpg" },
//   { id: 2, word: "شامپو", english: "Shampoo", image: "https://thumbs.dreamstime.com/b/cartoon-shampoo-bottle-bubbles-text-dispenser-stylized-cartoon-illustration-shampoo-bottle-pump-dispenser-413090846.jpg" },
//   { id: 3, word: "مسواک", english: "Toothbrush", image: "https://img.favpng.com/20/24/21/toothbrush-cartoon-tooth-brushing-clip-art-png-favpng-Cr1Q3GEwAJGciiC2R0ZgFkMAZ.jpg" },
//   { id: 4, word: "خمیر دندان", english: "Toothpaste", image: "https://png.pngtree.com/png-clipart/20230307/ourmid/pngtree-toothpaste-cartoon-png-image_6635972.png" },
//   { id: 5, word: "حوله", english: "Towel", image: "https://static.vecteezy.com/system/resources/previews/039/096/042/non_2x/towel-cartoon-doodle-png.png" },
//   { id: 6, word: "شانه", english: "Comb", image: "https://thumbs.dreamstime.com/b/cute-vector-illustration-hair-comb-cartoon-style-girl-243486338.jpg" },
//   { id: 8, word: "حمام", english: "Bath", image: "https://t3.ftcdn.net/jpg/02/72/87/10/360_F_272871089_YDpDhBLwFYqR2xHmXN6otpW0X5uiWvFu.jpg" },
//   { id: 9, word: "دستشویی", english: "Toilet", image: "https://cdn.vectorstock.com/i/1000v/26/14/interior-toilet-room-in-minimalist-style-cartoon-vector-25902614.jpg" },
//   { id: 10, word: "آینه", english: "Mirror", image: "https://static.vecteezy.com/system/resources/previews/068/246/280/non_2x/cartoon-illustration-of-an-ornate-mirror-free-vector.jpg" },
//   { id: 11, word: "دستمال", english: "Tissue", image: "https://thumbs.dreamstime.com/b/cartoon-tissue-box-10308496.jpg" },
//   { id: 12, word: "دوش", english: "Shower", image: "https://png.pngtree.com/png-vector/20241213/ourmid/pngtree-shower-clipart-hd-png-image_14746810.png" },
//   { id: 13, word: "آب‌کشی", english: "Rinse", image: "https://thumbs.dreamstime.com/b/vector-illustration-proper-hand-washing-procedures-step-rinse-thoroughly-water-flat-procedure-individual-version-186825665.jpg" },
//   { id: 14, word: "تمیز", english: "Clean", image: "https://c8.alamy.com/comp/2PT10K7/cartoon-little-boy-cleaning-a-mirror-2PT10K7.jpg" },
//   { id: 15, word: "کثیف", english: "Dirty", image: "https://t4.ftcdn.net/jpg/13/37/20/63/360_F_1337206304_zVNzrX9DUc07UG21xqCjOwHBoPegnpQk.jpg" }
// ]
//   },
// غذاها
//   {
//     id: "food",
//     title: " غذاها",
//     words:  [
//   { id: 1, word: "نان", english: "Bread", image: "https://c8.alamy.com/comp/2JG54FN/thanksgiving-baked-bread-cartoon-colored-clipart-2JG54FN.jpg" },
//   { id: 2, word: "برنج", english: "Rice", image: "https://heyclipart.com/cdn/shop/files/10-steamed-rice-bowl-vector-cartoon-illustration-43.jpg" },
//   { id: 3, word: "گوشت", english: "Meat", image: "https://t3.ftcdn.net/jpg/00/85/71/66/360_F_85716607_V0u0HtkQslWUuAyUeQtMhKVuNde0Lgah.jpg" },
//   { id: 4, word: "مرغ", english: "Chicken", image: "https://t4.ftcdn.net/jpg/06/22/86/37/360_F_622863769_g1EFRdIXq2EkKraOqlwprqznNsb371Qn.jpg" },
//   { id: 5, word: "تخم‌مرغ", english: "Egg", image: "https://thumbs.dreamstime.com/b/cartoon-egg-carton-cracked-brown-vibrant-illustration-depicts-grey-filled-numerous-eggs-one-center-open-revealing-408930040.jpg" },
//   { id: 6, word: "شیر", english: "Milk", image: "https://t3.ftcdn.net/jpg/01/81/44/78/360_F_181447847_1Rxj7JBiBI5xC1mqlKWBKTfew0AOVwlN.jpg" },
//   { id: 7, word: "پنیر", english: "Cheese", image: "https://t4.ftcdn.net/jpg/06/93/00/13/360_F_693001315_4rdEBh7kaM4qwdrrKwLNGlI2BSxd0sij.jpg" },
//   { id: 8, word: "ماست", english: "Yogurt", image: "https://www.shutterstock.com/image-vector/vector-illustration-cartoon-yogurt-cup-260nw-2644763075.jpg" },
//   { id: 9, word: "سوپ", english: "Soup", image: "https://t4.ftcdn.net/jpg/08/76/47/53/360_F_876475359_lv5FdWZkCANcqNuYrfTpdnx3AhryWaao.jpg" },
//   { id: 10, word: "سالاد", english: "Salad", image: "https://t3.ftcdn.net/jpg/08/03/63/70/360_F_803637089_fOl1CyrKKsrv9maKTDOlYeL6DM8W24TZ.jpg" },
//   { id: 11, word: "میوه", english: "Fruit", image: "https://t3.ftcdn.net/jpg/07/54/05/32/360_F_754053238_KTvhv2BUjaNMJXQl8OpzXvnRQ3aG4urF.jpg" },
//   { id: 12, word: "سبزیجات", english: "Vegetable", image: "https://png.pngtree.com/png-clipart/20250417/original/pngtree-cartoon-vegetable-clipart-for-kids-png-image_20772566.png" },
//   { id: 14, word: "شیرینی", english: "Cake", image: "https://i.pinimg.com/736x/b7/4e/d0/b74ed07962cc20e4f2c4054daf8f8491.jpg" },
//   { id: 15, word: "بستنی", english: "Ice cream", image: "https://t3.ftcdn.net/jpg/16/61/23/98/360_F_1661239812_0kVT1F4OOTQKtER5aeUm5E3shmyH4rZX.jpg" }
// ]
//   },
// افعال
//   {
//     id: "verbs",
//     title: "افعال",
//     words:  [
//   { id: 1, word: "رفتن", english: "Go", image: "https://thumbs.dreamstime.com/b/bussinesman-go-to-work-cartoon-illustration-vector-67914161.jpg" },
//   { id: 2, word: "آمدن", english: "Come", image: "https://img.magnific.com/premium-vector/vocabulary-flash-card-kids-come-with-picture-come_51635-6497.jpg" },
//   { id: 3, word: "خوردن", english: "Eat", image: "https://png.pngtree.com/png-clipart/20190115/ourmid/pngtree-girl-eating-goods-eating-cartoon-cartoon-png-image_364650.jpg" },
//   { id: 4, word: "نوشیدن", english: "Drink", image: "https://static.vecteezy.com/system/resources/previews/048/918/710/non_2x/boy-drinking-juice-cartoon-illustration-vector.jpg" },
//   { id: 5, word: "خوابیدن", english: "Sleep", image: "https://i.pinimg.com/1200x/8c/4c/32/8c4c328ddbed0d770bbbb8dc065f7927.jpg" },
//   { id: 6, word: "بازی کردن", english: "Play", image: "https://png.pngtree.com/png-clipart/20240622/original/pngtree-happy-cartoon-kids-playing-vector-illustration-children-playful-moment-png-image_15386102.png" },
//   { id: 7, word: "خواندن", english: "Read", image: "https://t4.ftcdn.net/jpg/00/53/28/85/360_F_53288559_asesBQuUxBlEVLPX2vfZ0mmgKO8fDxle.jpg" },
//   { id: 8, word: "نوشتن", english: "Write", image: "https://png.pngtree.com/png-clipart/20240830/original/pngtree-cartoon-boy-writing-a-book-with-pencil-and-paper-png-image_15894986.png" },
//   { id: 9, word: "دیدن", english: "See", image: "https://previews.123rf.com/images/julinzy/julinzy1305/julinzy130500003/19622623-business-girl-searching.jpg" },
//   { id: 10, word: "شنیدن", english: "Hear", image: "https://img3.stockfresh.com/files/l/lenm/m/20/4339368_stock-vector-listening-girl.jpg" },
//   { id: 11, word: "دویدن", english: "Run", image: "https://png.pngtree.com/png-vector/20250605/ourmid/pngtree-happy-boy-running-png-image_16462741.png" },
//   { id: 12, word: "پریدن", english: "Jump", image: "https://c8.alamy.com/comp/2GPG35K/trampoline-jumping-children-sport-games-happy-cartoon-kids-have-fun-isolated-boy-girl-playing-vector-illustration-2GPG35K.jpg" },
//   { id: 13, word: "نشستن", english: "Sit", image: "https://img.magnific.com/premium-vector/cartoon-vector-illustration-boy-sitting-chair_1080480-146520.jpg" },
//   { id: 14, word: "ایستادن", english: "Stand", image: "" },
//   { id: 15, word: "فکر کردن", english: "Think", image: "" }
// ]
//   },
// طبیعت
//   {
//     id: "nature",
//     title: "طَبیعَت",
//     words:  [
//   { id: 1, word: "درخت", english: "Tree", image: "" },
//   { id: 2, word: "گل", english: "Flower", image: "" },
//   { id: 3, word: "کوه", english: "Mountain", image: "" },
//   { id: 4, word: "دریا", english: "Sea", image: "" },
//   { id: 5, word: "رودخانه", english: "River", image: "" },
//   { id: 6, word: "آسمان", english: "Sky", image: "" },
//   { id: 7, word: "خورشید", english: "Sun", image: "" },
//   { id: 8, word: "ماه", english: "Moon", image: "" },
//   { id: 9, word: "ستاره", english: "Star", image: "" },
//   { id: 10, word: "ابر", english: "Cloud", image: "" },
//   { id: 11, word: "باران", english: "Rain", image: "" },
//   { id: 12, word: "برف", english: "Snow", image: "" },
//   { id: 13, word: "باد", english: "Wind", image: "" },
//   { id: 14, word: "جنگل", english: "Forest", image: "" },
//   { id: 15, word: "زمین", english: "Earth", image: "" }
// ]
//   },

// وسایل نقلیه
//   {
//     id: "transportation",
//     title: "وسایل نقلیه",
//     words:[
//   { id: 1, word: "ماشین", english: "Car", image: "" },
//   { id: 2, word: "اتوبوس", english: "Bus", image: "" },
//   { id: 3, word: "قطار", english: "Train", image: "" },
//   { id: 4, word: "هواپیما", english: "Airplane", image: "" },
//   { id: 5, word: "هلیکوپتر", english: "Helicopter", image: "" },
//   { id: 6, word: "دوچرخه", english: "Bicycle", image: "" },
//   { id: 7, word: "موتور", english: "Motorcycle", image: "" },
//   { id: 8, word: "کِشتی", english: "Ship", image: "" },
//   { id: 9, word: "قایق", english: "Boat", image: "" },
//   { id: 10, word: "تاکسی", english: "Taxi", image: "" },
//   { id: 11, word: "مترو", english: "Subway", image: "" },
//   { id: 12, word: "ون", english: "Van", image: "" },
//   { id: 13, word: "کامیون", english: "Truck", image: "" },
//   { id: 14, word: "اسکوتر", english: "Scooter", image: "" },
//   { id: 15, word: "آمبولانس", english: "Ambulance", image: "" }
// ]
//   },

// میوه
//   {
//     id: "fruits",
//     title: "میوه ",
//     words: [
//   { id: 1, word: "سیب", english: "Apple", image: "" },
//   { id: 2, word: "پُرتقال", english: "Orange", image: "" },
//   { id: 3, word: "موز", english: "Banana", image: "" },
//   { id: 4, word: "انگور", english: "Grapes", image: "" },
//   { id: 5, word: "هندوانه", english: "Watermelon", image: "" },
//   { id: 6, word: "خربزه", english: "Melon", image: "" },
//   { id: 7, word: "گلابی", english: "Pear", image: "" },
//   { id: 8, word: "توت‌فرنگی", english: "Strawberry", image: "" },
//   { id: 9, word: "آلبالو", english: "Cherry", image: "" },
//   { id: 10, word: "لیمو", english: "Lemon", image: "" },
//   { id: 11, word: "انبه", english: "Mango", image: "" },
//   { id: 12, word: "کیوی", english: "Kiwi", image: "" },
//   { id: 13, word: "هلو", english: "Peach", image: "" },
//   { id: 14, word: "آناناس", english: "Pineapple", image: "" },
//   { id: 15, word: "خرما", english: "Date", image: "" }
// ]
//   },

// مدرسه
//   {
//     id: "school",
//     title: "مدرسه",
//     words:  [
//   { id: 1, word: "مدرسه", english: "School", image: "" },
//   { id: 2, word: "دانش‌آموز", english: "Student", image: "" },
//   { id: 3, word: "مُعَلِّم", english: "Teacher", image: "" },
//   { id: 4, word: "کِتاب", english: "Book", image: "" },
//   { id: 5, word: "قَلم", english: "Pen", image: "" },
//   { id: 6, word: "مَداد", english: "Pencil", image: "" },
//   { id: 7, word: "تخته", english: "Board", image: "" },
//   { id: 8, word: "میز", english: "Desk", image: "" },
//   { id: 9, word: "کلاس", english: "Classroom", image: "" },
//   { id: 10, word: "زنگ", english: "Bell", image: "" },
//   { id: 11, word: "تکلیف", english: "Homework", image: "" },
//   { id: 12, word: "امتحان", english: "Exam", image: "" },
//   { id: 13, word: "کاغذ", english: "Paper", image: "" },
//   { id: 14, word: "مداد رنگی", english: "Crayons", image: "" },
//   { id: 15, word: "کِیف", english: "Bag", image: "" }
// ]
//   },

// جانوران
//   {
//     id: "animals",
//     title: "جانوران",
//     words: [
//   { id: 1, word: "سگ", english: "Dog", image: "" },
//   { id: 2, word: "گربه", english: "Cat", image: "" },
//   { id: 3, word: "اسب", english: "Horse", image: "" },
//   { id: 4, word: "گاو", english: "Cow", image: "" },
//   { id: 5, word: "گوسفند", english: "Sheep", image: "" },
//   { id: 6, word: "بُز", english: "Goat", image: "" },
//   { id: 7, word: "مرغ", english: "Chicken", image: "" },
//   { id: 8, word: "اردک", english: "Duck", image: "" },
//   { id: 9, word: "فیل", english: "Elephant", image: "" },
//   { id: 10, word: "شیر", english: "Lion", image: "" },
//   { id: 11, word: "ببر", english: "Tiger", image: "" },
//   { id: 12, word: "خرگوش", english: "Rabbit", image: "" },
//   { id: 13, word: "ماهی", english: "Fish", image: "" },
//   { id: 14, word: "پرنده", english: "Bird", image: "" },
//   { id: 15, word: "خرس", english: "Bear", image: "" }
// ]
//   }
];

const [selectedCategory, setSelectedCategory] =
  useState(0);

const words =
  categories[selectedCategory].words;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentWord = words[currentIndex];

  const options = useMemo(() => {
    const others = words
      .filter((w) => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [currentWord, ...others].sort(
      () => Math.random() - 0.5
    );
  }, [currentIndex]);

  const speakWord = (text) => {
    try {
      const utterance =
        new SpeechSynthesisUtterance(text);

      utterance.lang = "fa-IR";

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch {}
  };

  const handleSelect = (item) => {
    if (showAnswer) return;

    const isCorrect =
      item.id === currentWord.id;

    setSelected(item);
    setShowAnswer(true);

    if (isCorrect) {
      setScore((s) => s + 10);
      setStars((s) => s + 3);
      speakWord(currentWord.word);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);

    if (currentIndex < words.length - 1) {
      setCurrentIndex((p) => p + 1);
    } else {
      alert(
        `🎉 بازی تمام شد\nامتیاز: ${score}`
      );

      setCurrentIndex(0);
      setScore(0);
      setStars(0);
    }
  };

  const progress =
    ((currentIndex + 1) / words.length) * 100;

  return (
    <div
      className="container py-4"
      dir="rtl"
      style={{
        maxWidth: "1000px",
      }}
    >
      <div className="card shadow-lg border-0">

        <div className="card-body">

          <h2 className="text-center mb-4">
            🎯 بازی واژگان فارسی
          </h2>
<div className="mb-4">

  <label className="fw-bold mb-2 d-block">
    موضوع درس
  </label>

  <select
    className="form-select"
    value={selectedCategory}
    onChange={(e) => {
      setSelectedCategory(
        Number(e.target.value)
      );

      setCurrentIndex(0);
      setScore(0);
      setStars(0);
      setShowAnswer(false);
    }}
  >
    {categories.map((cat, index) => (
      <option
        key={cat.id}
        value={index}
      >
        {cat.title}
      </option>
    ))}
  </select>

</div>
{/* <div className="d-flex flex-wrap gap-2 mb-4">

 {categories.map((cat,index)=>(
   <button
     key={cat.id}
     className={
       selectedCategory===index
       ? "btn btn-primary"
       : "btn btn-outline-primary"
     }
     onClick={()=>{
       setSelectedCategory(index)
     }}
   >
      {cat.title}
   </button>
 ))}

</div> */}
          {/* progress */}

          <div
            className="progress mb-4"
            style={{ height: "13px" }}
          >
            <div
              className="progress-bar "
              style={{
                width: `${progress}%`,
                backgroundColor:" #83108d"
              }}
            />
          </div>

          {/* score */}

          <div className="d-flex justify-content-between mb-4">

            <h5 className="me-2">
              ⭐ ستاره‌ها: {stars}
            </h5>

            <h5 className="ms-2">
              🏆 امتیاز: {score}
            </h5>

          </div>

          {/* question */}

          {!showAnswer && (
            <>
              <h3 className="text-center mb-5">

                کُدام تَصویر

                <span
                  className="text-danger mx-2"
                  style={{
                    fontSize: "40px",
                  }}
                >
                  {currentWord.word}<span> </span>  
                 </span>   

                 اَست؟  
              </h3>

              <div className="row">

                {options.map((item) => (
                  <div
                    key={item.id}
                    className="col-lg-3 col-md-6 col-6 mb-4"
                  >
                    <div
                      className="card shadow-sm h-100"
                      onClick={() =>
                        handleSelect(item)
                      }
                      style={{
                        cursor: "pointer",
                        transition: ".3s",
                      }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          height: "180px",
                          objectFit:
                            "contain",
                          padding: "10px",
                        }}
                      />

                      <div className="card-body text-center">

                        <button
                          className="btn btn-primary"
                        >
                          انتخاب
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* answer */}

          {showAnswer && (
            <div className="text-center py-2">

              {selected?.id ===
              currentWord.id ? (
                <>
                  <div className=" me-auto ms-auto"
                    style={{
                      fontSize: "70px", width:"150px", height:"150px"
                    }}
                  >
                    <img className="w-100 h-100" src="https://i.pinimg.com/originals/02/7e/29/027e29cec37c6e02272009f011fe3a57.gif" alt="good job" />
                  </div>

                  {/* <h1 className="text-success">
                    آفرین
                  </h1> */}

                  <img
                    src={
                      currentWord.image
                    }
                    alt=""
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit:
                        "contain",
                    }}
                  />

                  <h2 className="mt-3 text-danger">
                    {currentWord.word}
                  </h2>

                  <h4>
                    {currentWord.english}
                  </h4>

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    ⭐⭐⭐
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto"
                    style={{
                      fontSize: "70px",width:"150px",height:"150px"
                    }}
                  >
                    <img className="w-100 h-100" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2JodTJxdjIwOTE3azAzeHQxYWFzNXJmOWY0c3JjNGs5YXJhZGR6cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/470d8dONpiPjZC5AMX/giphy.gif" alt="" />
                  </div>

                  {/* <h2 className="text-danger">
                    پاسخ اشتباه بود
                  </h2> */}

                  {/* <h3 className="mt-3">
                    پاسخ درست:
                  </h3> */}

                  <img
                    src={
                      currentWord.image
                    }
                    alt=""
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit:
                        "contain",
                    }}
                  />

                  <h2 className="mt-1 text-success">
                    {currentWord.word}
                  </h2>
                </>
              )}

              <button
                onClick={nextQuestion}
                className="btn btn-success btn-lg mt-4"
              >
                مرحله بعد ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}