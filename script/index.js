import products from '../modules/data.js'
let container = document.querySelector('.container')
let count = document.querySelector('.count')
let cart = []


function reload(arr, place, isCart = false) { 
    place.innerHTML = ''
    for(let item of arr) {
        let div = document.createElement('div')
        let top = document.createElement('div')
        let bottom = document.createElement('div')
        let img = document.createElement('img')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')
        let flx = document.createElement('div')
        let b = document.createElement('b')
        let b2 = document.createElement('b')
        let b3 = document.createElement('b')
        let button = document.createElement('button')


        div.classList.add('item')
        top.classList.add('top')
        bottom.classList.add('bottom')
        flx.classList.add('flx')
        button.classList.add('btn')

        b.classList.add('price')
        b2.classList.add('rate')
        b3.classList.add('countt')

        img.src = item.image
        h3.innerHTML = item.title
        p.innerHTML = `${item.description.slice(0,150)} ... Читать польностю`
        b.innerHTML = item.price
        b2.innerHTML = item.rating.rate
        b3.innerHTML = item.rating.count
        button.innerHTML = isCart === true ? "Удалить" : "В избранное"
        

        if(cart.includes(item.id)) {
            button.classList.add('active-btn')
            button.innerHTML = "Добавлено"
            button.innerHTML = isCart === true ? "Удалить" : "Добавлено"
            
        }

        div.append(top, bottom)
        top.append(img)
        flx.append(b,b2,b3)
        bottom.append(h3,p,flx,button)
        place.append(div)

        button.onclick = () => {
            if(cart.includes(item.id)) {
                cart.splice( cart.indexOf(item.id), 1)          
            } else {
                cart.push(item.id);
            }

            count.innerHTML = cart.length

            showCartsElems()
            reload(products, container)
        }
        p.onclick = () => {
            let p2 = document.createElement('p')
            p.innerHTML = item.description
            p2.innerHTML = 'Скрыть'
            p.append(p2)
            p2.style.color = '#fff'
            p2.onclick = () => {
                reload(products,container)
            }
        }


    }   
}

function showCartsElems() {
    let newCart = []
    for(let item of products) {
        for(let elem of cart) {
            if(item.id === elem) {
                newCart.push(item)
            }
        }
    }
    reload(newCart, document.querySelector('.cart'), true)
}


reload(products, container)


let slicebtn = document.querySelector('.sliceshow')
let btnshow = document.querySelector('.showall')

slicebtn.onclick = () => {
    let slc = products.slice(0,5)
    reload(slc,container)
}
btnshow.onclick = () => {
    reload(products,container)
}
