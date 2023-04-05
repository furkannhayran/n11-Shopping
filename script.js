var globalData;
var globalArray = [];
var db;
$(document).ready(function async() {
    // window.location.href = '../main/index.html';
    db = openDatabase("myDb", "1.0", "shopping Product", 2 * 1024 * 1024)
    createDataBase(db)
    // insertDataBase(db)
    selectDataBase(db)
    // selectDataBaseID(1)
    // deleteDataBase(1)
    // updateDataBase(1)
    $.getJSON("./main.json", function (data) {
        dynamicSlader(data)
        moonoffer(data);
        shoppngContent(data);
        DynamicPhone(data)
        globalData = data;
    })
    setInterval(() => {
        aoutoSlider();
    }, 5000)
    denek();

    dynamicShop()
    orderInfo()

});

const createDataBase = (db) => {
    try {
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Shopping (name,src,time,price)")
        })
    }
    catch (error) {
        console.log("Hata ", error)
    }
};

const insertDataBase = (data) => {

    try {
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO Shopping(name,src,time,price) VALUES (?,?,?,?)",
                [data.name, data.src, data.time, data.price])
        })
    }
    catch (error) {
        console.log("Hata ", error)
    }
}
const selectDataBase = () => {
    try {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM shopping", [], (tx, result) => {
                for (var i = 0; i < result.rows.length; i++) {
                    globalArray.push(result.rows[i])
                }
            })
        })
    }
    catch (error) {
        console.log("Hata ", error)
    }
}

const selectDataBaseID = (index) => {
    debugger
    try {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM shopping where rowid=?", [index], (tx, result) => {

                for (var i = 0; i < result.rows.length; i++) {
                    console.log("id:", result.rows[i])
                }
            })
        })
    }
    catch (error) {
        console.log("Hata ", error)
    }
}

// const deleteDataBase = (id)=>{
//     try {
//         db.transaction(function (tx) {
//             tx.executeSql("DELETE FROM shopping where name=?", [id], (tx, result) => {
//                 console.log(result)
//             })
//         })
//     }
//     catch (error) {
//         console.log("Hata ", error)
//     }
// }


// const updateDataBase = (id)=>{
//     try {
//         db.transaction(function (tx) {
//             tx.executeSql("UPDATE shopping SET ,name=?,src=?,time=?,price=?", [12,"Deneme","asd.pgn","15:12",12321], (tx, result) => {
//                 console.log(result)
//             })
//         })
//     }
//     catch (error) {
//         console.log("Hata ", error)
//     }
// }

const dynamicSlader = function (data) {
    data.socailImage.map(function (item, index) {
        var images = `<img  src="${item.src}" style="${index === 0 ? "Display:inline" : "Display:none"}"/> `
        $(".socailImage").append(images)
    })
};
var activeSlider = 0;
// }
const handlePrev = () => {
    clearInterval();
    if (activeSlider > 0) {
        activeSlider = activeSlider - 1;
        $(".socailImage").find('img').stop().fadeOut();
        $(".socailImage").find('img').eq(activeSlider).stop().fadeIn();
    }
    return false;
};
const handleNext = () => {
    clearInterval();
    if (activeSlider < ($(".socailImage").find('img').length) - 1) {

        activeSlider = activeSlider + 1;
        $(".socailImage").find('img').stop().fadeOut();
        $(".socailImage").find('img').eq(activeSlider).stop().fadeIn();
    }
    return false;
};
const aoutoSlider = () => {
    if (activeSlider < $(".socailImage").find('img').length) {
        activeSlider = activeSlider + 1;
    }
    if (activeSlider === $(".socailImage").find('img').length) {
        activeSlider = 0;
    }
    $(".socailImage").find('img').stop().fadeOut();
    $(".socailImage").find('img').eq(activeSlider).stop().fadeIn();

};

const moonoffer = (data) => {
    data.moonoffer.map(function (item, index) {
        var superOffer =
            `<div class="moonferDynamicContent" style="${index < 5 ? "Display:inline" : "Display:none"}">
            <div>
                <h5>Süper Fırsatlar</h5>
            </div>
            <div>
                <img src="${item.src}"></img>
                <span class="material-symbols-outlined">
                    favorite
                </span>
            </div>
            <div>
                timeing
            </div>
            <h5>${item.name}</h5>
            <div class="moonferDynamicContentfooter">
                <span>${item.price}</span>
                <button onclick="addBAsketcontent(${index})">Sepete Ekle </button>
            </div>
        </div>`
        $(".monoferContent").append(superOffer);
    })
};
activeBar = 0;
const monoHandlePrev = () => {
    if (activeBar >= 10) {
        activeBar -= 10;
        $(".monoferContent").find('.moonferDynamicContent').map(function (item) {
            if (item < 5) {
                $(".monoferContent").find('.moonferDynamicContent')[item].style = "Display:inline";
            }
            if (item >= 5) {
                $(".monoferContent").find('.moonferDynamicContent')[item].style = "Display:none";
            }
        })
    }
    return false;
};

const monoHhandleNext = () => {
    if (activeBar < $(".monoferContent").find('.moonferDynamicContent').length) {
        activeBar += 10;
        // 
        $(".monoferContent").find('.moonferDynamicContent').map(function (item) {
            if (item < 5) {
                $(".monoferContent").find('.moonferDynamicContent')[item].style = "Display:none";
            }
            if (item >= 5) {
                $(".monoferContent").find('.moonferDynamicContent')[item].style = "Display:inline";
            }
        })
    }
    return false;
};
const locationPopup = () => {
    $(".LocationSelcet")[0].style = "Display:inline";
    $.getJSON("./Country.json", function (data) {
        var options = "<option>" + "Seçim Yapınız " + "</options>";
        data.city.map(function (item) {
            options += "<option>" + item.name + "</options>";
        })
        var locations = `
            <div class="locationCaontainerMain">
                <div class="locationCaontainerImg">
                    <div></div>
                    <div>
                        <h1>Konum Seçin, Avantajları Kaçırmayın!</h1>
                        <pre>
                            Konum seçerek aynı gün teslimatlı ve konumunuza özel indirimli
                            ürünleri kolayca görebilir, avantajlardan yararlanabilirsiniz.
                        </pre>
                    </div>
                    <button onclick="popupClose()"> colose</button>
                </div>
                <div class="locationCaontainerSelect">
                    <select>
                        ${options}
                    </select>
                    <select>
                        ${options}
                    </select>
                </div>
                <div class="locationCaontainerFooter">
                    <span>
                        Konum seçmenin avantajları neler?
                    </span> 
                    <button>Konum Seç</button>
                </div>
            </div>
            `
        $(".LocationSelcet").append(locations);
    })
};
const popupClose = () => {
    $(".LocationSelcet")[0].style = "Display:none";

}
const shoppingPath = () => {
    window.location.href = 'shop.html';



};
const denek = () => {
    $("#logincontentFirstChild").before("<div class='logincontentFirstChildImg'> </div>");

    $("#logincontentTwoChildImg").before("<div class='logincontentFirstChildImg'> </div>");

    $("#logincontentTreeChildImg").before("<div class='logincontentFirstChildImg'> </div>");

};
////////////////////////////////////////////////Shopping
const shoppngContent = (data) => {

    data.moonoffer.map(function (item, index) {
        const content =
            `
            <div class="shopRecommendedContent" style="${(index === 0 || index === 1) ? " Display:inline" : "Display:none"}" >
                <div class="shopRecommendedNavbar">
                    <div class="shopRecommendedImg">
                        <img width="104" height="104"
                            src="${item.src}"
                            alt="">
                    </div>
                    <div class="shopRecommendedHeader">
                        <div class="shoppingContentMgz">
                            <span>Mağaza: </span>
                            <span>Hasimoglu</span>
                        </div>
                        <span class="shoppingContentProcutName">
                            ${item.name}
                        </span>
                        <div class="shopRecommendedFooter">
                            <span id="price">${item.price}</span>
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `
        $(".shopRecommended").prepend(content);
    });
};

///////////////////////////////////////////////////////////////////// insert
const addBAsketcontent = (oEvent) => {

    globalData.moonoffer.map(function (item, index) {
        if (index === oEvent) {
            // globalArray.push(item);
            insertDataBase(item)
        }
    })
}
const indexncontentTrue = () => {
    // 
    $(".indexVisibliy")[0].style = "display:inline";
    $(".indexSpan")[0].style = "display:none";
}
const indexncontentFalse = () => {

    $(".indexVisibliy")[0].style = "display:none";
    $(".indexSpan")[0].style = "display:inline";
}
// const denenes = (oEvent) =>{
//     console.log(oEvent)
//     // window.location.href = "/helpCart.html"
// }
// $(".dwadwadawsd li").click(function(oEvent){
//     console.log(oEvent)
// })
$("#result li").click(function (oEvent) {

})
var shopBasketamount = 1;
var globalVaeaiable = [];
//////////////////////////////////////////Shopping
const dynamicShop = async () => {
    try {
        await db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM shopping", [], (tx, result) => {
                for (var i = 0; i < result.rows.length; i++) {

                    var item = result.rows[i]

                    globalVaeaiable.push(result.rows[i])
                    productContent =
                        `

                                <div class="shopBasketNavbar">
                                    <div class="shopBasketNavbarContainer">


                                        <div class="shopBasketImg">
                                        <img src="${item.src}"></img>
                                        </div>



                                        <div class="shopBasketNavbarCtn">
                                        <span class="shopBasketNavbarCtnName">${item.name}</span>

                                        <div class="shopBasketCounter">
                                                <button onclick="HandlePressReduce(${i})" class="shopBasketCounterBtnReduce">-</button>
                                                <div class="shopBasketCounterSpan">${shopBasketamount}</div>
                                                <button onclick="HandlePressIncrase(${i})" class="shopBasketCounterIncrase">+</button>
                                                <span class="shopBasketCounterRemove material-symbols-outlined">
                                                delete
                                                </span>
                                        </div>

                                        </div>

                                    </div>


                                    <div class="shopBasketCargo">
                                        <span>Sürat Kargo: <b>Kargo Ücretsiz</b></span>
                                    </div>

                                    <div class="shopBasketProductPrice">
                                        <span>${item.price} TL</span>
                                    </div>

                                </div>

                            `
                    $(".shopBasket").append(productContent)
                }
            })
        })
    }
    catch (error) {
        console.log("Hata ", error)
    }
}
const DynamicPhone = (data) => {
    data.moonoffer.map(function (item, index) {
        var superOffesr =
            `
            <div class="phoneDynamicContent" style="${index < 3 ? " Display:inline" : "Display:none"}" >
                <div>
                    <h5>Süper Fırsatlar</h5>
                </div>
                <div class="phoneDynamicContentImg">
                    <img src="${item.src}"></img>
                    <span class="material-symbols-outlined">
                        favorite
                    </span>
                </div>
                <div>
                    timeing
                </div>
                <h5>${item.name}</h5>
                <div class="phoneDynamicContentfooter">
                    <span>${item.price}</span>
                    <button onclick="addBAsketcontent(${index})">Sepete Ekle </button>
                </div>
            </div>
            `
        $(".dynamicPhoneImgContent").append(superOffesr);
    })
}


////////////////////////////////////////////////Shopping
const orderInfo = async () => {
    try {
        await db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM shopping", [], (tx, result) => {
                var price = 0;
                var denenen = []
                for (var i = 0; i < result.rows.length; i++) {
                    var item = result.rows[i]
                    denenen.push(item);
                    price += item.price

                }
                var info =
                    `
                <h4 class="shopOrnerSummuryTitle">
                Sipariş Özeti
                </h4>
                <div class="shopOrnerSummuryProductPrice">
                    <h5>sipariş tutarı(${denenen.length} ürün)</h5>
                    <span>${price} TL</span>
                </div>
                <hr class="shopOrnerSummuryHR"/>
                <div class="shopOrnerSummuryTotalPrice">
                    <h2>Toplam Tutar</h2>
                    <span>${price} TL</span>
                </div>
                <button class="shopOrnerSummuryBtn">Satın Al</button>
                <span class="shopOrnerSummurySpan">Sepete Özel Taksit Seçenekleri</span>
                `
                $(".shopOrnerSummury").append(info)
            })
        })
    }
    catch (error) {
        console.log("Hata ", error)
    }
}
const LoginOpen = () => {
    window.location.href = 'login.html';

}

const shopRecommendedArrowFonk = () => {
    alert()

}

var shopRevommendSlider = 9;
// }
const shopRevommendhandlePrev = () => {

};
const shopRevommendhandleNext = () => {
    shopRevommendSlider -= 2;
    $(".shopRecommendedContent").map(function (index, item) {
        if (index > shopRevommendSlider && index <= (shopRevommendSlider + 2)) {
            item.style = "Display:inline"

        } else {
            if (shopRevommendSlider === 1) {
                $(".material-symbols-outlined").map(function (index, element) {
                    if (element.id === "shopRecommendedArrow") {
                        element.style = "Display:none"
                    }
                })
            }
            item.style = "Display:none"
        }
    })
};
// 
// shopBasketCounterIncrase
const HandlePressReduce = (oEvent) => {
    shopBasketamount -= 1;
    if (shopBasketamount !== 0) {
        $(".shopBasketNavbar .shopBasketCounterSpan").map(function (index, item) {
            if (index === oEvent) {
                item.innerHTML = shopBasketamount

            }
        })
    }
}
const HandlePressIncrase = (oEvent) => {
    shopBasketamount += 1;
    $(".shopBasketNavbar .shopBasketCounterSpan").map(function (index, item) {
        if (index === oEvent) {
            item.innerHTML = shopBasketamount

        }
    })
} 
const indexhtml = () =>{

    window.location.href = 'index.html';
}