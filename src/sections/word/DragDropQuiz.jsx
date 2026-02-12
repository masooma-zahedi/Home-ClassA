import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { questions1, questions2, questions3 } from './dataWord';

const questions1 = [
      {
        sentence: 'مَن هَر روز به ___ می‌رَوَم.',
        correctWord: 'مَدرِسه',
        options: ['مَدرِسه', 'سیب', 'باران'],
        image: 'https://i.pinimg.com/736x/28/07/eb/2807eb52c3035c3caa48347167545cd4.jpg'
      },
      {
        sentence: 'او یِک ___ در دست دارَد.',
        correctWord: 'کتاب',
        options: ['کتاب', 'دویدن', 'زنگ'],
        image: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=1200'
      },
      {
        sentence: 'مَن نان تازه ___ دارَم.',
        correctWord: 'دوست',
        options: ['بَستَنی', 'دوست', 'سَرما','نیما'],
        image: 'https://borna.news/files/fa/news/1399/3/23/1788123_900.jpg'
      },
      {
        sentence: 'مادَر کَمی ___ به غَذا زَد.',
        correctWord: 'نَمَک',
        options: ['نَمَک', 'میوه', 'بُشقاب'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Table_salt_with_salt_shaker_V1.jpg'
      },
      {
        sentence: ' ___ دَر دَریا زِندِگی می کُنَد.',
        correctWord: 'نَهَنگ',
        options: ['جوجه', 'شیر', 'گَوَزن','نَهَنگ'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/1200px-Killerwhales_jumping.jpg'
      },
      {
        sentence: 'پِدَرَم بَرایَم یِک ___ خَرید.',
        correctWord: 'کُلاه',
        options: ['هَوا', 'آسمان', 'مادَر','کُلاه'],
        image: 'https://sainc2.myshopify.com/cdn/shop/products/beach-hat-red-front-ss20-2500px_6a3730db-77cc-44d6-b437-b027b32bb044.jpg?v=1718389492'
      },
      {
        sentence: ' ___نوک کوچَکی دارَد.',
        correctWord: 'پَرَندِه',
        options: ['پَرَندِه', 'روباه', 'ماهی','تِمساح'],
        image: 'https://statics.basalam.com/public-7/users/kRZKpN/2110/wq4ytYJSJBtoG93qZQpTpO390nrWk4rbf79ftOGJ.jpg'
      },
      {
        sentence: 'مَن با ___ لِباس دوختَم.',
        correctWord: 'نَخ',
        options: [ 'چوب','نَخ', 'لیوان','مِداد'],
        image: 'https://www.lavanbaft.com/wp-content/uploads/2022/02/nakh.jpg'
      },
      {
        sentence: 'زَنبور ___ زَد.',
        correctWord: 'نیش',
        options: [ 'گِریه', 'کُتَک','عَسَل','نیش'],
        image: 'https://www.digikala.com/mag/wp-content/uploads/2023/05/01-Bee-Sting-Treatment-1.jpg'
      },
      {
        sentence: '___ بالای دِرَخت رَفت.',
        correctWord: 'گُربه',
        options: ['کَفش', 'گُربه', 'گُل','موبایل'],
        image: 'https://cdn.fararu.com/thumbnail/OTliY2YXgLxy/fCohl8MdDeqLuUiNxwx9X4gYrgKL9XBZBWdbZWUJQbHweEbOeibJ3lKhwCXPcymMenByfMSSpsbh46ioIqLjxbHMRm21_h7HQpcPeRTlTup9Fg2BIMEOf3jclM_4J6zeNSYMgfXaohvvVGVyDx5LlALVa--jwrBG/OTliY2YXgLxy.jpg'
      },
      {
    sentence: 'مَن با ___ می‌نویسَم.',
    correctWord: 'خودکار',
    options: ['چاقو', 'خودکار', 'کاسه'],
    image: 'https://png.pngtree.com/png-clipart/20220110/original/pngtree-child-writing-png-image_7067306.png'
  },
  {
    sentence: 'مادَر ___ را دَر یَخچال گُذاشت.',
    correctWord: 'شیر',
    options: ['کتاب', 'شیر','کفش'],
    image: 'https://thumbs.dreamstime.com/b/woman-red-striped-shirt-holding-milk-carton-open-refrigerator-vector-illustration-wearing-takes-kitchen-setting-399222992.jpg'
  },
  {
    sentence: 'بَچّه‌ها در ___ بازی می‌کُنَند.',
    correctWord: 'پارک',
    options: ['پارک', 'مدرسه', 'آشپزخانه'],
    image: 'https://thumbs.dreamstime.com/b/kids-play-park-playground-vector-illustration-children-swing-outdoor-summer-school-kindergarten-city-landscape-kids-play-park-137126419.jpg'
  },
  {
    sentence: 'دَر آسمان ___ می‌تابَد.',
    correctWord: 'خورشید',
    options: [ 'ماهی', 'دَره','خورشید',],
    image: 'https://img.freepik.com/premium-photo/cartoon-illustration-bright-sun-shining-blue-sky-with-puffy-white-clouds_14117-1194529.jpg'
  },
  {
    sentence: 'پِسَر بایک ___ بازی می‌کُنَد.',
    correctWord: 'توپ',
    options: ['توپ', 'نان', 'میز'],
    image: 'https://static.vecteezy.com/system/resources/previews/039/657/376/non_2x/ai-generated-child-playing-ball-free-png.png'
  },
  {
    sentence: 'ما در ___ خوابیدیم.',
    correctWord: 'چادُر',
    options: [ 'کتابخانه','چادُر', 'ماشین'],
    image: 'https://img.freepik.com/premium-photo/cartoon-illustration-family-camping-with-tent-campfire-mountains-background_14117-1073676.jpg'
  },
  {
    sentence: 'پِدَر با ___ کار می‌کُنَد.',
    correctWord: 'کِشتی',
    options: [ 'پرنده', 'دوچرخه','کِشتی',],
    image: 'https://www.shutterstock.com/image-vector/fishing-boat-flat-vector-illustration-260nw-1470908513.jpg'
  },
  {
    sentence: '___ سَبز است و در باغ می‌روید.',
    correctWord: 'درَخت',
    options: ['درَخت', 'میز', 'کِتاب'],
    image: 'https://i.pinimg.com/736x/f0/51/49/f05149383b0a087c378b2860d2b13413.jpg'
  },
  {
    sentence: 'مَن با ___ غذا می‌خورَم.',
    correctWord: 'قاشق',
    options: [ 'مداد', 'کفش','قاشق'],
    image: 'https://thumbs.dreamstime.com/b/little-boy-spoon-fork-sitting-table-315675805.jpg'
  },
  {
    sentence: 'ما دَر ___ زندگی می‌کُنیم.',
    correctWord: 'خانه',
    options: [ 'مدرسه','خانه', 'دریا'],
    image: 'https://img.freepik.com/free-vector/family-living-home_1308-25009.jpg'
  }
]

// باید عکس ها را وارد کنی
const questions2 = [
    // masooma
      {
        sentence: 'او ___ وَ اُفتاد.',
        correctWord: 'لیز خورد',
        options: ['لیز خورد', 'غَذاخورد', 'کِتاب خواند'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-31-verb.png`
      },
      {
        sentence: 'نَگذار بَستَنی اَت ___',
        correctWord: 'آب شَوَد(ذوب شَوَد)',
        options: ['پُخته شَوَد', 'آب شَوَد(ذوب شَوَد)', 'بُزُرگ شَوَد '],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-32-verb.png`
      },
      {
        sentence: 'مِیمون موز را ___ وَ خورد.',
        correctWord: 'پوست کَند',
        options: ['اَنداخت','پوست کَند' ,'بازی کَرد'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-33-verb.png`
      },
      {
        sentence: 'دانِش آموزان ___ یِک مادِه شیمیایی جَدید هَستَند.',
        correctWord: 'دَر حالِ آزمایِش',
        options: ['دَر حالِ آزمایِش', 'در حال تماشا کردن', ' در حال خوابیدن'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-34-verb.png`
      },
      {
        sentence: 'او اَنگُشتانَش را ___.',
        correctWord: 'می شُمارَد',
        options: ['گِریه می کُنَد', 'راه می رَوَد', 'می شُمارَد'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-35-verb.png`
      },
      {
        sentence: 'آچار خود را بَردارید وَ مُهرِه را ___ .',
        correctWord: 'سِفت کُنید',
        options: ['سِفت کُنید', 'بیاندازید', 'خَراب کُنید'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-36-verb.png`
      },
      {
        sentence: 'لیلی با صِدایِ بُلَند شَروع به ___ کَرد.',
        correctWord: 'خُروپُف کَردَن',
        options: ['جیغ زَدَن ', 'بالا پَریدَن', 'خُروپُف کَردَن'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-37-verb.png`
      },
      {
        sentence: 'پِسر دیروز با قایِق روی دَریاچه ___.',
        correctWord: 'عُبور کَرد',
        options: ['زِندِگی کَرد', 'عُبور کَرد', 'کار کَرد'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-38-verb.png`
      },
      {
        sentence: 'میشه نَتایِج آزمون اِنگِلیسی خود را به مَن ___.',
        correctWord: 'نِشان دَهید',
        options: ['نِشان دَهید', 'بپوشانی', 'بِرَوید'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-39-verb.png`
      },
      {
        sentence: 'اَنگُشتت را به سَمتِ مَن ___.',
        correctWord: 'اِشارِه نَکن',
        options: ['نَدِه', 'نَخور', 'اِشارِه نَکن'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-40-verb.png`
      },
      {
        sentence: 'حُضار پَس اَز سَخَنرانی او با صِدایِ بُلَند ___.',
        correctWord: 'دَست زَدَند',
        options: ['دَست زَدَند', 'خوابیدَند', 'کار کَردَند'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-42-verb.png`
      },
      {
        sentence: 'او دَستکِش را دَر آوَرد تا با دوستَش ___.',
        correctWord: 'دَست بِدَهَد',
        options: ['راه بِرَوَد', 'دَست بِدَهَد', 'پَرواز کُنَد'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-43-verb.png`
      },
      {
        sentence: 'او دَر حال ___ توپ اَست.',
        correctWord: 'گِرِفتَن',
        options: ['گِرِفتَن', 'زَدَن', 'نِوِشتَن'],
        image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-44-verb.png`
      },
    
]

// باید عکس ها را وارد کنی 
const questions3 = [
  {
    sentence: 'او جَعبِه را از روی ___ بُلَند کَرد.',
    correctWord: 'میز',
    options: [ 'کِتاب', 'کِیف','میز',],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-45-verb.png`
  },
  {
    sentence: 'من به دانِش‌آموزانَم ___ آموزِش می‌دَهَم.',
    correctWord: 'انگلیسی',
    options: [ 'ریاضی','انگلیسی', 'نقاشی'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-46-verb.png`
  },
  {
    sentence: 'وَقتی به ایستگاه ___ رِسیدَم دوباره با شُما تَماس خواهم گِرِفت.',
    correctWord: 'اتوبوس',
    options: [ 'قَطار','اتوبوس', 'مَدرِسِه'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-47-verb.png`
  },
  {
    sentence: 'او به ___ می‌رَوَد.',
    correctWord: 'مدرسه',
    options: ['مدرسه', 'بیمارستان', 'مغازه'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-48-verb.png`
  },
  {
    sentence: 'هَر جا می‌رَفتَم کِتاب را با خودَم ___ می‌کَردَم.',
    correctWord: 'حمل',
    options: ['پنهان', 'تمیز','حمل', ],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-49-verb.png`
  },
  {
    sentence: 'او در را ___ کرد.',
    correctWord: 'قُفل',
    options: [ 'باز', 'رَنگ','قُفل',],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-50-verb.png`
  },
  {
    sentence: 'مَن می‌خواهَم بَرایِ جَشن تَوَلُد دوستَم ___ بِپَزَم.',
    correctWord: 'کِیک',
    options: [ 'کَباب', 'کِیک','بِرِنج'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-51-verb.png`
  },
  {
    sentence: 'او رویِ ___ شِناوَر بود.',
    correctWord: 'پُشتَش',
    options: ['پُشتَش', 'سینه‌اش', 'پایش'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-52-verb.png`
  },
  {
    sentence: 'جوکِر هَمزَمان با پَنج ___ بازی کَرد.',
    correctWord: 'توپ',
    options: ['توپ', 'سیب', 'جَعبِه'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-53-verb.png`
  },
  {
    sentence: 'سَگ ___ را گاز گِرِفت.',
    correctWord: 'پایَش',
    options: ['دَستَش', 'گوشَش','پایَش', ],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-54-verb.png`
  },
  {
    sentence: 'من یک ___ را به خانه پرتاب کردم.',
    correctWord: 'توپ',
    options: [ 'سیب',,'توپ', 'کتاب'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-55-verb.png`
  },
  {
    sentence: 'او ___ را تا می‌کند.',
    correctWord: 'پتو',
    options: ['پتو', 'پیراهن', 'کاغذ'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-56-verb.png`
  },
  {
    sentence: 'او آرد را با دو عدد ___ مخلوط کرد.',
    correctWord: 'تخم‌مرغ',
    options: ['تخم‌مرغ', 'سیب‌زمینی', 'پیاز'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-57-verb.png`
  },
  {
    sentence: 'او در حال حفر یک ___ عمیق است.',
    correctWord: 'چاله',
    options: [ 'کمد','چاله', 'چتر'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-58-verb.png`
  },
  {
    sentence: 'من هفته‌ای دوبار کف ___ را تمیز می‌کنم.',
    correctWord: 'آشپزخانه',
    options: [ 'اتاق', 'حیاط','آشپزخانه',],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-59-verb.png`
  },
  {
    sentence: 'ما می‌خواهیم خانه خود را ___ .',
    correctWord: 'بسازیم',
    options: [ 'ترک', 'رها','بسازیم',],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-60-verb.png`
  },
  {
    sentence: 'او برای من تصویری از ___ کشید.',
    correctWord: 'دایناسور',
    options: ['دایناسور', 'ماشین', 'ماهی'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-61-verb.png`
  },
  {
    sentence: 'من قبل از خروج از خانه موهایم را ___ کردم.',
    correctWord: 'شانه',
    options: ['شانه', 'رنگ', 'شستشو'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-62-verb.png`
  },
  {
    sentence: 'ما در ___ اسکیت می‌کنیم.',
    correctWord: 'پارک',
    options: [ 'خیابان', 'پارک','مدرسه'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-63-verb.png`
  },
  {
    sentence: 'او با ظرافت روی ___ در پارک تاب خورد.',
    correctWord: 'تاب',
    options: [ 'در', 'تخته','تاب'],
    image: `${process.env.PUBLIC_URL}/images/assetWord/actionVerb/12-31-64-verb.png`
  }
];

const action4 = [
  {
    sentence: 'او دَر ___ کِتاب می‌خوانَد.',
    correctWord: 'کِتاب‌خانِه',
    meaning: 'library',
    options: ['خانِه', 'کِتاب‌خانِه', 'خِیابان'],
    image: 'https://img.freepik.com/premium-photo/there-is-cartoon-picture-library-with-books-shelves_1035769-31453.jpg'
  },
  {
    sentence: 'پِدَرَم دَر ___ کار می‌کُنَد.',
    correctWord: 'بیمارِستان',
    meaning: 'hospital',
    options: ['مَدرَسِه', 'پارک', 'بیمارِستان'],
    image: 'https://thumbs.dreamstime.com/b/young-doctor-standing-front-hospital-building-cartoon-155998765.jpg'
  },
  {
    sentence: 'ما بَرای خَریدِ گُل به ___ رَفتیم.',
    correctWord: 'گُل‌فُروشی',
    meaning: 'flower shop',
    options: ['مَدرَسِه', 'گُل‌فُروشی', 'کِتاب‌خانِه'],
    image: 'https://thumbs.dreamstime.com/b/flower-shop-interior-green-natural-decorations-woman-florist-seller-cartoon-design-vector-illustration-flower-shop-interior-green-139043276.jpg'
  },
  {
    sentence: 'سارا با ___ به پارک رَفت.',
    correctWord: 'دوچَرخه',
    meaning: 'bicycle',
    options: ['ماشین', 'مِداد', 'دوچَرخه'],
    image: 'https://img.freepik.com/premium-vector/cute-girl-cycling-bicycle-cartoon-vector-illustration_1080480-151956.jpg'
  },
  {
    sentence: 'او اَز ___ بَرای خوردَنِ سوپ اِستِفادِه کَرد.',
    correctWord: 'قاشُق',
    meaning: 'spoon',
    options: ['چاقو', 'ماهیتابِه', 'قاشُق'],
    image: 'https://www.shutterstock.com/image-vector/cute-boy-having-lunch-preschool-600nw-1705328893.jpg'
  },
  {
    sentence: 'مادَر بَرای ناهار ___ پُخت.',
    correctWord: 'قُورمِه‌سَبزی',
    meaning: 'ghormeh sabzi',
    options: ['قُورمِه‌سَبزی', 'شیرینی', 'ساندویچ'],
    image: 'https://cdn.nody.ir/files/2021/06/12/nody-%D8%B9%DA%A9%D8%B3-%D8%AA%D8%B2%DB%8C%DB%8C%D9%86-%D9%82%D9%88%D8%B1%D9%85%D9%87-%D8%B3%D8%A8%D8%B2%DB%8C-1623479060.jpg'
  },
  {
    sentence: 'دَر فَصلِ تابِستان هَوا بِسیار ___ اَست.',
    correctWord: 'گَرم',
    meaning: 'hot',
    options: ['بارانی', 'سَرد', 'گَرم'],
    image: 'https://static.vecteezy.com/system/resources/previews/002/695/317/non_2x/stickman-businessman-character-walks-in-hot-weather-and-his-tongue-is-out-cartoon-illustration-free-vector.jpg'
  },
  {
    sentence: 'ما دَر ___ ناهار می‌خوریم.',
    correctWord: 'سالُنِ‌غذاخوری',
    meaning: 'cafeteria / dining hall',
    options: ['مَدرَسِه', 'کِتاب‌خانِه', 'سالُنِ‌غذاخوری'],
    image: 'https://images.stockcake.com/public/6/f/7/6f73e604-1c31-4278-a8e7-64f5c5e1ee52_large/school-cafeteria-buzz-stockcake.jpg'
  },
  {
    sentence: 'پِدَر مَن یِک ___ جَدید خَرید.',
    correctWord: 'ماشین',
    meaning: 'car',
    options: ['دوچَرخه‌سواری', 'مِداد', 'ماشین'],
    image: 'https://t4.ftcdn.net/jpg/01/75/41/99/360_F_175419966_DvmsbkV48YXpByUUcbFamnYq7KEvDTuG.jpg'
  },
  {
    sentence: 'کودَکان دَر ___ بازی می‌کُنَند.',
    correctWord: 'زَمین‌بازی',
    meaning: 'playground',
    options: ['زَمین‌بازی', 'مَدرَسِه', 'اتاق'],
    image: 'https://thumbs.dreamstime.com/b/autumn-playground-children-playing-park-illustration-390011742.jpg'
  },
  {
    sentence: 'او دَر ___ کار می‌کُنَد و نان می‌پَزد.',
    correctWord: 'نانوایی',
    meaning: 'bakery',
    options: ['مَدرَسِه', 'نانوایی', 'بیمارِستان'],
    image: 'https://t3.ftcdn.net/jpg/09/11/65/24/360_F_911652488_Sa0cd8hU0NFrrHiVPZ9T1H4behczTFhT.jpg'
  },
  {
    sentence: 'ما دیشَب به ___ رَفتیم و شام خُوردیم.',
    correctWord: 'رِستُوران',
    meaning: 'restaurant',
    options: ['خانِه', 'رِستُوران', 'مَدرَسِه'],
    image: 'https://thumbs.dreamstime.com/b/vibrant-cartoon-restaurant-interior-diners-waiters-ai-generated-illustration-lively-cartoon-illustration-modern-323741928.jpg'
  },
  {
    sentence: 'دَر ___ می‌توانیم دارو بِخَریم.',
    correctWord: 'داروخانِه',
    meaning: 'pharmacy',
    options: ['کِتاب‌خانِه', 'داروخانِه', 'بیمارِستان'],
    image: 'https://thumbs.dreamstime.com/b/pharmacist-preparing-medication-pharmacy-counter-shelves-medicine-vector-pharmacist-preparing-medication-410663409.jpg'
  },
  {
    sentence: 'او دَر ___ می‌نِشینَد وَ نَقّاشی می‌کِشَد.',
    correctWord: 'اتاقِ‌خواب',
    meaning: 'bedroom',
    options: ['مَدرَسِه', 'اتاقِ‌خواب', 'رِستُوران'],
    image: 'https://static.vecteezy.com/system/resources/previews/000/432/331/non_2x/boy-and-girl-drawing-picture-in-bedroom-vector.jpg'
  },
    {
    sentence: 'مَن هَر روز با دوستَم به ___ می‌رَوَم.',
    correctWord: 'مَدرَسِه',
    meaning: 'school',
    options: ['گُل‌فُروشّی', 'مَدرَسِه', 'کِتاب‌خانِه'],
    image: 'https://media.istockphoto.com/id/537076949/vector/school-building-in-flat-style.jpg?s=612x612&w=0&k=20&c=RWzAsSEFxbT5mm1QUzvgqliqEVYrnY0Rvybhjbjj3jE='
  },

  {
    sentence: 'دَر ___ فیلم تَماشا کَردیم.',
    correctWord: 'سینَما',
    meaning: 'cinema',
    options: ['خانِه', 'مَدرَسِه', 'سینَما'],
    image: 'https://images.stockcake.com/public/1/2/4/12430b33-bb89-4a00-b88f-81547b76107a_large/animated-cinema-experience-stockcake.jpg'
  },
  {
    sentence: 'او با دوستانَش دَر ___ فوتبَال بازی کَرد.',
    correctWord: 'وَرزِشگاه',
    meaning: 'stadium',
    options: ['رِستُوران', 'وَرزِشگاه', 'کِتاب‌خانِه'],
    image: 'https://c8.alamy.com/comp/2J031DA/cartoon-gym-interior-room-with-sport-fitness-equipment-sport-elements-fitness-room-interior-vector-illustration-dumbbells-treadmill-and-exercise-2J031DA.jpg'
  },
  {
    sentence: 'دَر ___ وَسایِل زیادی مِثل میز وَ صَندَلی می‌سازَند.',
    correctWord: 'کارگاه',
    meaning: 'workshop',
    options: ['مَدرَسِه', 'کارگاه', 'خانِه'],
    image: 'https://t3.ftcdn.net/jpg/00/70/92/30/360_F_70923061_CIbmHC9Tx2pbfIWHJzv6UeAMWw54YNIb.jpg'
  },
  {
    sentence: 'اِمروز به ___ بَرای خَرید رَفتیم.',
    correctWord: 'بازار',
    meaning: 'market',
    options: ['بازار', 'مَدرَسِه', 'کِتاب‌خانِه'],
    image: 'https://imgcdn.stablediffusionweb.com/2024/12/10/59da0982-3def-41f7-a3bd-ffde20377b5b.jpg'
  },
  {
    sentence: 'کودَکان دَر روزِ تَعطیل به ___ می‌رَوَند.',
    correctWord: 'پارک',
    meaning: 'park',
    options: ['مَدرَسِه', 'پارک', 'کارگاه'],
    image: 'https://thumbs.dreamstime.com/b/autumn-playground-children-playing-park-illustration-390011742.jpg'
  }
];
const dailyQuestions = [
  {
    sentence: 'خُروس با ___ به زَمین نوک می‌زَنَد.',
    correctWord: 'نوک',
    meaning: 'beak',
    options: ['نوک', 'بال', 'پا'],
    image: 'https://static.vecteezy.com/system/resources/thumbnails/059/433/853/small/wonderful-traditional-a-rooster-crowing-with-its-beak-open-professional-png.png'
  },
  {
    sentence: '___ زَمین را رَو‌شَن می‌کُنَد.',
    correctWord: 'خورشید',
    meaning: 'sun',
    options: ['ماه', 'خورشید', 'اَبَر'],
    image: 'https://www.shutterstock.com/shutterstock/videos/1747219/thumb/1.jpg?ip=x480'
  },
  {
    sentence: 'شیر خوردَن، بَدَن را ___ می‌کُنَد.',
    correctWord: 'قَوی',
    meaning: 'strong',
    options: ['قَوی', 'سَرد', 'کوچَک'],
    image: 'https://img.freepik.com/premium-vector/strong-kid-flexing-muscles-cartoon-style_635759-1712.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    sentence: 'مادَر یِک کیک ___ پَخت.',
    correctWord: 'خوشمَزِه',
    meaning: 'delicious',
    options: ['خوشمَزِه', 'تَلخ', 'سَرد'],
    image: 'https://cdn.vectorstock.com/i/1000v/47/90/delicious-cake-with-girl-thumbs-up-vector-8314790.jpg'
  },
  {
    sentence: 'پِدَر با ___ یِک نامه نِوِشت.',
    correctWord: 'خودکار',
    meaning: 'pen',
    options: ['خودکار', 'پاک‌کن', 'دَفتَر'],
    image: 'https://static.vecteezy.com/system/resources/previews/065/006/993/non_2x/blue-pen-cartoon-character-writing-on-paper-with-playful-expression-and-black-gloves-illustration-vector.jpg'
  },
  {
    sentence: 'پِسَرِ خاله‌اَم یِک ___ کوچولو اَست.',
    correctWord: 'نوزاد',
    meaning: 'baby',
    options: ['نوزاد', 'دانِش‌آموز', 'پِدَر'],
    image: 'https://png.pngtree.com/png-clipart/20241129/original/pngtree-cartoon-baby-cute-illustration-png-image_17414440.png'
  },
  {
    sentence: 'دیروز بَرایِ مادَرَم یِک ___ خَریدم.',
    correctWord: 'کادو',
    meaning: 'gift',
    options: ['کادو', 'کِتاب', 'کَفش'],
    image: 'https://static.vecteezy.com/system/resources/previews/022/451/716/non_2x/the-child-gives-his-mother-gift-cartoon-illustration-for-mother-s-day-or-birthday-vector.jpg'
  },
  {
    sentence: 'دَریایِ آبی ___ زیادی داشت.',
    correctWord: 'موج',
    meaning: 'wave',
    options: ['موج', 'ماهی', 'قایِق'],
    image: 'https://t3.ftcdn.net/jpg/08/04/04/08/360_F_804040851_3ETNVvfH6LJJPeoFreHVkzwxzfS3h9Qf.jpg'
  },
  {
    sentence: '___ یِک میوه زَرد اَست.',
    correctWord: 'موز',
    meaning: 'banana',
    options: ['موز', 'سیب', 'هَویج'],
    image: 'https://thumbs.dreamstime.com/b/cheerful-cartoon-banana-character-23357029.jpg'
  },
  {
    sentence: 'مَن با ___ به مَدرَسه می‌رَوَم.',
    correctWord: 'مِترو',
    meaning: 'subway',
    options: ['مِترو', 'دوچَرخه', 'ماشین'],
    image: 'https://img.freepik.com/premium-photo/cartoon-illustration-subway-train-arriving-station_14117-1052400.jpg'
  },
  {
    sentence: 'آدَم ___ پا دارَد.',
    correctWord: 'دو',
    meaning: 'two',
    options: ['دو', 'سِه', 'چِهار'],
    image: 'https://c8.alamy.com/zooms/9/aa8227e96bf14367b7decb9586b6b677/py4615.jpg'
  },
  {
    sentence: 'اَمین رادیو را ___ کَرد.',
    correctWord: 'رُو‌شَن',
    meaning: 'turn on',
    options: ['رُو‌شَن', 'خاموش', 'شِکَسته'],
    image: 'https://img.freepik.com/premium-vector/flat-design-illustration-happy-young-man-listening-radio_207579-727.jpg'
  },
  {
    sentence: 'یِک ___ زیبا رویِ دیوار بود.',
    correctWord: 'تابلو',
    meaning: 'painting',
    options: ['تابلو', 'پَنجَره', 'فَرِش'],
    image: 'https://media.istockphoto.com/id/545585228/vector/pictures-gallery.jpg?s=612x612&w=0&k=20&c=g5W6VxfvwIWQ7qTy0Mzi0xArS2XrxESqvEQa0KHOrvE='
  }
];
const natureQuestions = [
  {
    sentence: 'در آسمان ___ می‌تابَد.',
    correctWord: 'خورشید',
    meaning: 'sun',
    options: ['ماه', 'خورشید', 'اَبَر'],
    image: 'https://t4.ftcdn.net/jpg/14/91/61/87/360_F_1491618742_zdlKsCsqo2hn4r4hPDbdJzX1m0OSx5uj.jpg'
  },
  {
    sentence: 'در فَصلِ بَهار، ___ باز می‌شَوَند.',
    correctWord: 'گُل‌ها',
    meaning: 'flowers',
    options: ['دِرَختان', 'بَرف‌ها', 'گُل‌ها'],
    image: 'https://ecogardener.com/cdn/shop/articles/Best_Spring_Flowers_For_Your_Garden-min_c03d5cc8-f5d2-4455-a2d5-c4620051e200.jpg?v=1764554210'
  },
  {
    sentence: 'ما در ___ قَدَم می‌زَنیم.',
    correctWord: 'جَنگَل',
    meaning: 'forest',
    options: ['خانه', 'جَنگَل', 'مَدرَسه'],
    image: 'https://t3.ftcdn.net/jpg/02/49/44/26/360_F_249442668_03OK18MUC4GTg8nQFR1tGsuihbaCZOAP.jpg'
  },
  {
    sentence: '___ از آسمان می‌بارَد.',
    correctWord: 'باران',
    meaning: 'rain',
    options: ['خورشید', 'باد', 'باران'],
    image: 'https://t4.ftcdn.net/jpg/08/95/30/45/360_F_895304582_2b3rCIKvZzbdoIeZX8O8nrtRY9qhd3aq.jpg'
  },
  {
    sentence: 'در کِنارِ رودخانه، ___ دیده می‌شود.',
    correctWord: 'ماهی',
    meaning: 'fish',
    options: ['ماهی', 'دِرَخت', 'اَبَر'],
    image: 'https://static.vecteezy.com/system/resources/thumbnails/000/432/373/small/v9jq_42iz_160601.jpg'
  },
  {
    sentence: 'در پاییز، بَرگ‌ها از ___ می‌اُفتَند.',
    correctWord: 'دِرَخت',
    meaning: 'tree',
    options: ['اَبَر', 'دِرَخت', 'زَمین'],
    image: 'https://media.istockphoto.com/id/487775012/vector/autumn-tree.jpg?s=612x612&w=0&k=20&c=4kK3CXtjgrw6OqzGCw-r-iFFRakyszt28MN8r_9FQTE='
  },
  {
    sentence: 'در آسمانِ شَب، ___ می‌دَرَخشَند.',
    correctWord: 'سِتاره‌ها',
    meaning: 'stars',
    options: ['دِرَخت‌ها', 'اَبَرها', 'سِتاره‌ها'],
    image: 'https://www.shutterstock.com/shutterstock/videos/16739053/thumb/11.jpg?ip=x480'
  },
  {
    sentence: '___ در کوه‌ها زِندِگی می‌کند.',
    correctWord: 'بُزکوهی',
    meaning: 'mountain goat',
    options: ['ماهی', 'بُزکوهی', 'مُرغ'],
    image: 'https://media.craiyon.com/2025-09-24/fCA5BEhZS26YzgTmG4suZQ.webp'
  },
  {
    sentence: 'در صَحر‌ا، شِن‌ها بِسیار ___ هستند.',
    correctWord: 'داغ',
    meaning: 'hot',
    options: ['سَرد', 'داغ', 'نَرم'],
    image: 'https://media.sciencephoto.com/c0/48/59/92/c0485992-800px-wm.jpg'
  },
  {
    sentence: '___ روی گُل نِشَستِه است.',
    correctWord: 'پَروانه',
    meaning: 'butterfly',
    options: ['پَرَنده', 'پَروانه', 'زَنبور'],
    image: 'https://i.pinimg.com/736x/d3/38/58/d33858854d12408eb433fba5ed2914c9.jpg'
  },
  {
    sentence: 'در جَنگَل صِدای ___ شِنیده می‌شود.',
    correctWord: 'پَرَنده‌ها',
    meaning: 'birds',
    options: ['دِرَخت‌ها', 'پَرَنده‌ها', 'اَبَرها'],
    image: 'https://www.shutterstock.com/image-vector/vector-illustration-colorful-birds-sitting-600nw-2349815483.jpg'
  },
  {
    sentence: 'در زِمِستان، زَمین پُر از ___ می‌شود.',
    correctWord: 'بَرف',
    meaning: 'snow',
    options: ['بَرف', 'باران', 'گُل'],
    image: 'https://us.123rf.com/450wm/natalyka/natalyka2208/natalyka220800001/189736935-winter-city-park-with-bench-lantern-trees-snowman-and-silhouettes-of-houses-vector-illustration.jpg?ver=6'
  },
  {
    sentence: '___ در باغ می‌وَزَد.',
    correctWord: 'باد',
    meaning: 'wind',
    options: ['خورشید', 'اَبر', 'باد'],
    image: 'https://static.vecteezy.com/system/resources/previews/018/892/011/non_2x/trees-during-the-windstorm-green-trees-with-falling-leaves-in-the-park-at-blowing-wind-landscape-cartoon-illustration-vector.jpg'
  },
  {
    sentence: 'دَریا پُر از ___ است.',
    correctWord: 'آب',
    meaning: 'water',
    options: ['بَرگ', 'آب', 'سَنگ'],
    image: 'https://www.shutterstock.com/image-vector/vector-calm-sea-ocean-surface-260nw-2320305515.jpg'
  },
  {
    sentence: 'در آسمان بَعد از باران، ___ دیده می‌شود.',
    correctWord: 'رَنگین‌کَمان',
    meaning: 'rainbow',
    options: ['رَنگین‌کَمان', 'خورشید', 'سِتاره'],
    image: 'https://media.istockphoto.com/id/474563986/vector/summer-rainbow.jpg?s=612x612&w=0&k=20&c=PlRwiNfYVjzZ6tMyPCg_hI9DmTqpIC5LXxcQ_g4e7rY='
  },
  {
    sentence: 'در کِنارِ دَریا ___ دیده می‌شود.',
    correctWord: 'شِن',
    meaning: 'sand',
    options: ['ماهی', 'شِن', 'دِرَخت'],
    image: 'https://thumbs.dreamstime.com/b/footprints-beach-sand-cartoon-vector-image-creative-designs-generated-using-ai-tool-394460736.jpg'
  },
  {
    sentence: '___ از کوه پایین می‌آیَد.',
    correctWord: 'رودخانه',
    meaning: 'river',
    options: ['رودخانه', 'اَبَر', 'دِرَخت'],
    image: 'https://cdn5.vectorstock.com/i/1000x1000/75/94/cartoon-mountain-river-waterfall-wild-vector-48417594.jpg'
  },
  {
    sentence: 'در باغ، زَنبورها روی ___ می‌نِشینَند.',
    correctWord: 'گُل',
    meaning: 'flower',
    options: ['بَرگ', 'گُل', 'دِرَخت'],
    image: 'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283728.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    sentence: 'در کوه، هَوای ___ وُجود دارد.',
    correctWord: 'سَرد',
    meaning: 'cold',
    options: ['گَرم', 'سَرد', 'مَرطوب'],
    image: 'https://media.istockphoto.com/id/1212924497/vector/winter-day-landscape-with-mountains.jpg?s=612x612&w=0&k=20&c=zvz6UlGfFzO5xWiI7bH7llLCajB6unBip9_irCbAZdo='
  },
  {
    sentence: 'خورشید در ___ غروب می‌کند.',
    correctWord: 'اُفُق',
    meaning: 'horizon',
    options: ['اُفُق', 'کوه', 'جَنگَل'],
    image: 'https://thumbs.dreamstime.com/b/cartoon-anime-sunset-sky-sea-landscape-background-vector-setting-sun-below-ocean-water-horizon-pink-clouds-manga-comic-408683256.jpg'
  }
];


// توجه: فرض شده questions1, questions2, questions3 در همین فایل یا در بالاتر وارد شده‌اند.
// اگر در جای دیگری هستند، آنها را ایمپورت کنید یا به صورت props ارسال کنید.

const DragDropQuiz = () => {
  const [questions, setQuestions] = useState(action4);
  const [idModal, setIdModal] = useState("question1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [droppedWord, setDroppedWord] = useState(null); // در این نسخه "کلمهٔ انتخاب‌شده"
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = questions[currentIndex];

  // در این نسخه دیگر درگ/دراپ نداریم؛ با کلیک روی یک گزینه، آن کلمه در جای خالی قرار می‌گیرد
  const placeWord = (word) => {
    setDroppedWord(word);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    setIsCorrect(droppedWord === currentQuestion.correctWord);
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    setDroppedWord(null);
    setIsCorrect(null);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setDroppedWord(null);
    setIsCorrect(null);
  };

  const resetCurrentQuestion = () => {
    setDroppedWord(null);
    setIsCorrect(null);
  };

  const getSentenceWithBlank = () => {
    const parts = currentQuestion.sentence.split("___");
    return (
      <>
        {parts[0]}
        <span
          className="d-inline-block border border-primary rounded px-3 py-1 mx-2"
          style={{ minWidth: "60px", minHeight: "30px", backgroundColor: "#f0f8ff", cursor: 'pointer' }}
          // با کلیک روی جای خالی هم می‌توان آن را پاک کرد
          onClick={() => setDroppedWord(null)}
          title="برای پاک کردن پاسخ اینجا کلیک کنید"
        >
          {droppedWord || "___"}
        </span>
        {parts[1]}
      </>
    );
  };

  const stylebg = {
    backgroundColor: "rgba(232, 231, 231, 0.99)",
  };

  const questionsqq = (e, i) => {
    setQuestions(e);
    setIdModal(i);
    setCurrentIndex(0); // ریست کردن به سوال اول
    setDroppedWord(null);
    setIsCorrect(null);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setDroppedWord(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className="test " dir="rtl" style={{ fontFamily: "Vazir,sans-serif" }}>
      <div
        className="container border  border-danger my-5 p-4 border rounded shadow  text-end direction-rtl"
        style={{ fontFamily: "Vazir", background:"linear-gradient(135deg, #cdf7a6c7, #f8ea8fc4)" }}
      >

        {/* اینجا قسمت فهرست هست که کامنت شده است */}
        {/*Start modal for titles */}
        {/* <div className="border border-success  p-3">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#' + idModal}>
            فهرست
          </button>

          <div className="modal fade" id={idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {' '}
                    فهرست مطالب{' '}
                  </h1>
                </div>
                <div className="modal-body">
                  <div className="d-flex flex-wrap">
                    <button className="btn  shadow-sm border  mx-2" style={stylebg} onClick={() => questionsqq(questions1, 'question1')}>
                      مرحله 1
                    </button>
                    <button className="btn shadow-sm border  mx-2" style={stylebg} onClick={() => questionsqq(questions2, 'question2')}>
                      مرحله 2
                    </button>
                    <button className="btn shadow-sm border mx-2" style={stylebg} onClick={() => questionsqq(questions3, 'question3')}>
                      مرحله 3
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End modal for titles */}

        <div className="text-center my-3">
          <span className="badge bg-info fs-6">سوال {currentIndex + 1} از {questions.length}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center m-5">
          <h4>جمله را کامل کن:</h4>
          <button className="btn btn-outline-danger btn-sm" onClick={resetGame}>
            شروع دوباره 🔁
          </button>
        </div>

        <div className="row align-items-center mb-4">
          {currentQuestion.image ? (
            <>
              <div className="col-md-4 text-center mb-3 mb-md-0">
                <img src={currentQuestion.image} alt="تصویر مربوط به سوال" className="img-fluid rounded" style={{ maxHeight: '200px' }} />
              </div>
              <div className="col-md-8">
                <p className="fs-2 ">{getSentenceWithBlank()}</p>
                <div className="mt-4 mb-3 ">
                  {currentQuestion.options.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => placeWord(word)}
                      className="btn btn-outline-secondary mx-2 mb-2"
                      style={{ cursor: 'pointer' }}
                      aria-pressed={droppedWord === word}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="col-12">
              <p className="fs-5">{getSentenceWithBlank()}</p>
              <div className="mt-4 mb-3 ">
                {currentQuestion.options.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => placeWord(word)}
                    className="btn btn-outline-secondary mx-2 mb-2"
                    style={{ cursor: 'pointer' }}
                    aria-pressed={droppedWord === word}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="d-flex gap-2 flex-wrap flex-row-reverse mx-4">
          <button className="btn btn-success" onClick={checkAnswer} disabled={!droppedWord}>
            بررسی پاسخ ✅
          </button>

          {/* <button className="btn btn-warning" onClick={resetCurrentQuestion}>
            پاک کردن پاسخ 🔄
          </button> */}

          {currentIndex > 0 && (
            <button className="btn btn-outline-secondary" onClick={prevQuestion}>
              سوال قبلی ⬅️
            </button>
          )}

          {isCorrect && currentIndex < questions.length - 1 && (
            <button className="btn btn-primary" onClick={nextQuestion}>
              سوال بعدی ➡️
            </button>
          )}
        </div>

        {isCorrect !== null && (
          <div className="mt-3">
            {isCorrect ? (
              <div className="alert alert-success">آفرین! پاسخ درست است. 🎉</div>
            ) : (
              <div className="alert alert-danger">پاسخ اشتباه است. دوباره امتحان کن. ❌</div>
            )}
          </div>
        )}

        {isCorrect && currentIndex === questions.length - 1 && (
          <div className="alert alert-info mt-4">👏 تمام سوال‌ها تمام شد!</div>
        )}
        <br />
        <br />
        <div className="text-muted">DragDropQuiz (click-to-place)</div>
      </div>
    </div>
  );
};

export default DragDropQuiz;
export {action4,natureQuestions,dailyQuestions}

