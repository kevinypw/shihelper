import React from "react";

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <h1 class="font-weight-light">A Guide to using the ShiHelper</h1>
          <div class="w-100">
            <p class="lead">
              ShiHelper is an annotation service that specializes in analyzing regulated verse poetry. 
              Specifically, its sepcialty is the 五言绝句 from the Tang Dynasty. 
              To read more about regulated verse poetry, go to the home page.
            </p>
            <h3 class="font-weight-normal pt-3">Input</h3>
            <p class="lead">
              To use the ShiHelper, simply enter text into the box at the top. 
              The characters will appear at the bottom of the screen. 
              It will only analyze Chinese characters.
            </p>
            <p class="h3 font-weight-normal pt-3">
              Annotation
            </p>
            <p class="lead">
              ShiHelper has two modes: a standard mode, and a regulated mode. The regulated mode can be seen as an extension of the standard mode.
            </p>
            <div class="row">
              <div class="col col-lg-9">
                <p class="h5 font-weight-normal pt-2">
                  Standard Mode
                </p>
                <p class="lead">
                  In standard mode, hovering over the displayed characters will display pinyin and english meanings for different versions of the character. 
                </p>
                <p class="lead">
                  On the right is a demo popup.
                  Each entry contains the character, the pinyin, a representation of middle pronunciation, and an english translation.
                </p>
                <p class="lead">
                  Clicking on the character allows you to change the version of the character that is used for analysis.
                </p>
              </div>
              <div class="col col-lg-3">
                <div class="card border border-dark" id="card">
                  <div class="card-body">
                    <h5 class="card-title">Middle Chinese:</h5>
                    <h5 class="card-title">Character</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Pinyin</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Middle Pronunciation</h6>
                    <p class="card-text">English Meaning</p>
                    <h5 class="card-title">Modern Chinese:</h5>
                    <h5 class="card-title">Character</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Pinyin</h6>
                    <p class="card-text">English Meaning</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="h5 font-weight-normal">
              Regulated Mode
            </p>
            <p class="lead">
              In regulated mode, along with the capabilities of standard mode, the ShiHelper will match the entered poem to the four regulated verse formats.
              Sticking to the typical five character per line regulated verse, it will truncate lines to five characters in length. 
            </p>
            <p class="lead">
              It will color each character based on its tone, level or oblique. Level is green, and oblique is blue.
            </p>
            <p class="lead">
              It will also add a tone indicator. Oblique tones are denoted by <mark>|</mark>, and level tones are denoted by <mark>⎯</mark>. 
              Red cells indicate that the character deviates from the expected tone. 
            </p>
            <p class="lead">
              At the end of lines, it will display suggested rhyme indicators as △ and pairs of tones as || or ⎯⎯.
              A pair of oblique tones is denoted by ||, and a pair of level tones is denoted by ⎯⎯.
            </p>
            <p class="lead">
              Finally, it displays recommended boilerplate parallel couplets. 
              A line that belongs to a nonparallel couplet is denoted with NP, and a line that belongs to a parallel couplet is denoted with P. 
            </p>
          </div>
          <p class="h3 font-weight-normal pt-3">
            Other Notes
          </p>
          <div class="w-100">
            <p class="lead">
              The poem that is loaded in by default is Du Fu's Spring Scene. 
            </p>
            <p class="lead">
              There is a bug where text copy and pasted in will not register. 
              I didn't have time to fix the bug, so just delete the entire contents of the editor and paste in the new poem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;