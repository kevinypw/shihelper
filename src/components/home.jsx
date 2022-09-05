import React from "react";
import dufu from '../images/Du-Fu-233x300.jpg';

function Home() {
  return (
    <div className="about">
    <div class="container">
      <div class="row align-items-center my-5">
        <h1 class="font-weight-light">Tang Dynasty Regulated Verse Poetry</h1>
        <div class="w-100">
          <p class="lead">
            Regulated verse was a type of complex poetry that reached its peak of development during the Tang Dynasty.
            A poet of this genre would have to follow many connected rules pertaining to word choice, syntax, structure, and tonal patterning.
          </p>
          <p class="h3 font-weight-normal pt-3">
            Popular Regulated Verse Poets
          </p>
          <div class="row">
            <div class="col col-lg-9">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col"><p class="lead">A short list of some popular poets of this genre.</p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th >Li Bai (李白)</th>
                </tr>
                <tr>
                  <th >Du Fu (杜甫)</th>
                </tr>
                <tr>
                  <th >Bai Juyi (白居易)</th>
                </tr>
                <tr>
                  <th >Wang Wei (王維)</th>
                </tr>
              </tbody>
            </table>
            </div>
            <div class="col col-lg-3">
              <img
              class="img-fluid rounded"
              src={dufu}
              alt="ffd"
              />
              <p class="text-center"><small>Du Fu</small></p>
            </div>
          </div>
          <h3 class="font-weight-normal pt-3">Syntax</h3>
          <p class="lead">
            Each line follows a distinct 2 + 3 semantic patterning. 
          </p>
          <p class="lead">
            The two middle couplets are required to be parallel in parts of speech and theme. 
          </p>
          <p class="lead">
            These two rules link the entire poem into a unified whole. 
          </p>
          <h3 class="font-weight-normal pt-3">Structure</h3>
          <p class="lead">
            Parallel and nonparallel couplets have to alternate. 
            Most regulated verse begins with a nonparallel couplet, has two parallel couplets in the middle, and ends with a nonparallel couplet.
            You can begin a poem using a parallel couplet, but you cannot end with one. 
            This naturally gives the poem a beginning, middle, and end structure. 
          </p>
          <p class="lead">
            This annotator is built assuming that the poem begins with a nonparallel couplet, has two parallel couplets in the middle, and ends with a nonparallel couplet.
          </p>
          <p class="lead">
            A poet may opt to stick to a four-stage progression: <em>qi</em> (beginning), <em>cheng</em> (continuation), <em>zhuan</em> (turn), and <em>he</em> (conclusion).
          </p>
          <h3 class="font-weight-normal pt-3">Tonal Patterning</h3>
          <p class="lead">
            There are two types of tones: level and oblique.
          </p>
          <table class="table">
            <caption>Table of tones and corresponding type</caption>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Oblique</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Level</td>
                <td>Falling-Rising</td>
              </tr>
              <tr>
                <td>Rising</td>
                <td>Falling</td>
              </tr>
              <tr>
                <td> </td>
                <td>Entering</td>
              </tr>
            </tbody>
          </table>
          <p class="lead">
            Each line must have the maximum contrast of tones.
            In other words, the tones must appear in two opposite pairs and an extra: a pair of level tones, a pair of oblique tones, and an "odd one out".
            The position of the "odd-one-out" dictates the position of the two pairs. 
            For example, if the odd tone is placed at the beginning of the line, we have ─ ─ ─ │ │ and │ │ │ ─ ─.
          </p>
          <p class="lead">
            The two lines in a couplet must also have the maximum contrast of tones. 
            Basically, the two lines have to have inverted tones, relative to each other. 
            Using the same example as before: ─ ─ ─ │ │ and │ │ │ ─ ─ can be a couplet.
          </p>
          <p class="lead">
            All even numbered lines must rhyme, and they must end in a level tone. 
          </p>
          <p class="lead">
            Two adjacent couplets must have partial equivalence. 
            The ending two tones of the first couplet must correspond to the opening two tones of the next.
          </p>
          <p class="lead">
            Thus, there are only four standard patterns for a quatrain. 
          </p>
          <div class="row">
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Standard Type I:</h5>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Standard Type II:</h5>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Variant Type I:</h5>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Variant Type II:</h5>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                </div>
              </div>
            </div>
          </div>
          <p class="lead mt-4">
            Four patterns can be constructed for regulated verse as well. 
          </p>
          <div class="row">
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Type I:</h5>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <hr></hr>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Type II:</h5>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <hr></hr>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Type Ia:</h5>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <hr></hr>
                  <p class="card-text">(─ ─) │ │ ─ ─ │ </p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                </div>
              </div>
            </div>
            <div class="col col-lg-3">
              <div class="card border border-dark" id="card">
                <div class="card-body">
                  <h5 class="card-title">Type IIa:</h5>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                  <hr></hr>
                  <p class="card-text">(│ │) ─ ─ ─ │ │</p>
                  <p class="card-text">(─ ─) │ │ │ ─ ─ △</p>
                  <p class="card-text">(─ ─) │ │ ─ ─ │</p>
                  <p class="card-text">(│ │) ─ ─ │ │ ─ △</p>
                </div>
              </div>
            </div>
          </div>
          <p class="lead mt-4">
            Not every poem will follow these formats. 
            Sometimes, sticking to a specific tonal pattern will result in a loss of meaning. 
            It is ultimately the poet's decision whether to stick to the pattern or not. 
          </p>
          <p class="lead">
            The annotator matches the poems, four lines at a time, to the quatrain formats. 
            Because the different formats of regulated verse are built using the quatrain formats, it allows it to analyze regulated verse as well. 
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;