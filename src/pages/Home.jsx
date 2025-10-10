import React from "react";
import StoryPage3 from "../sections/story/StoryPage3";
import WordGameWithCategories from "../sections/alphabet/WordGameWithCategories";
import SpellingGame from "../sections/alphabet/SpellingGame";

export default function Home() {
  return (<>
  <div >
    <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-info rounded">لطفا بچه ها داستان را تا بالای عکس بخوانند و بنویسند . همین طور فعالیت وسایل مدرسه را انجام دهند .این برای نوشتن آنها خوب است. </div>
    <StoryPage3 groupKey="alefba" wantedTitle="خارپُشت وَ پاییز"/>
    {/* <WordGameWithCategories initialCategory="وسایل مدرسه" /> */}
    <SpellingGame/>
    <div>
      <h5 className="bg-warning p-4 m-4 rounded text-center">برای احسان </h5>
          <StoryPage3 groupKey="kalemat" wantedTitle="باغِ وَحش"/>
    </div>


  </div>

  </>)
}
