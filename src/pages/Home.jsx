import React from "react";
import StoryPage3 from "../sections/story/StoryPage3";
import WordGameWithCategories from "../sections/alphabet/WordGameWithCategories";
import SpellingGame from "../sections/alphabet/SpellingGame";

export default function Home() {
  return (<>
  <div >
    <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-info rounded">لطفا بچه ها قسمت پایین عکس داستان را به همراه کلمات و معنی آن بنویسند. </div>
    <SpellingGame/>
    <StoryPage3 groupKey="alefba" wantedTitle="خارپُشت وَ پاییز"/>
    {/* <WordGameWithCategories initialCategory="وسایل مدرسه" /> */}
    <div>
      <h5 className="bg-warning p-4 m-4 rounded text-center">برای احسان </h5>
          <StoryPage3 groupKey="kalemat" wantedTitle="پیک نیک"/>
    </div>


  </div>

  </>)
}
