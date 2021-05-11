import React from "react";

function Sources() {
  return (
    <div className="sources">
        <div class="container">
            <div class="row align-items-center my-5">
                <h1 class="font-weight-light">Important Sources</h1>
                <p class="lead">
                This project stands on the shoulders of giants; it would not be possible without the following sources.
                </p>
                <div class="card w-100 mb-2">
                    <div class="card-body">
                        <h5 class="card-title">MDBG</h5>
                        <h6 class="card-subtitle mb-2 text-muted">CC-CEDICT</h6>
                        <p class="card-text">A downloadable Chinese to English dictionary with Pinyin pronunciation based on CEDICT.</p>
                        <a href="https://www.mdbg.net/chinese/dictionary?page=cedict" class="card-link">Go to source!</a>
                    </div>
                </div>
                <div class="card w-100 mb-2">
                    <div class="card-body">
                        <h5 class="card-title">Baxter-Sagart Old Chinese Reconstruction v1.1 [2014]</h5>
                        <h6 class="card-subtitle mb-2 text-muted">William H. Baxter, Laurent Sagant at UMich</h6>
                        <p class="card-text">About 5,000 items with Old Chinese and Middle Chinese reconstructions.</p>
                        <a href="http://ocbaxtersagart.lsait.lsa.umich.edu/BaxterSagartOCbyMandarinMC2014-09-20.pdf" class="card-link">Go to source!</a>
                    </div>
                </div>
                <div class="card w-100">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder">How to Read Chinese Poetry: A Guided Anthology (How to Read Chinese Literature)</h5>
                        <h6 class="card-subtitle mb-2 text-muted">蔡宗齊</h6>
                        <p class="card-text">A helpful anthology of Chinese Poetry, complete with explanations and analysis.</p>
                    </div>
                </div>
                <h1 class="font-weight-light pt-5">Other Sources</h1>
                <div class="w-100">
                    <p class="lead">
                        Some cool things I found while researching.
                    </p>
                </div>
                <div class="card w-100 mb-2">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder">中古音</h5>
                        <h6 class="card-subtitle mb-2 text-muted">National Taiwan University, Institute of Information Science</h6>
                        <p class="card-text">A database of Middle Chinese reconstructed characters.</p>
                        <a href="https://xiaoxue.iis.sinica.edu.tw/zhongguyin" class="card-link">Go to source!</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sources;