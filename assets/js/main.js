const categories = () => {

    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data))

}

// Categories 
const displayCategory = (category) => {

    for (let cat of category) {
        const categoryField = document.getElementById('categorie_container');
        const li = document.createElement('li');
        let a = document.createElement('a');

        a.classList.add('item');
        a.innerText = cat.category;
        a.id = cat.category_id;
        // a.onclick = loadOnClick(id);
        a.setAttribute('onClick', 'loadOnClick(id)');
        li.appendChild(a);
        // li.appendChild[0].classList.add('active');

        categoryField.appendChild(li);
    }
    const catItem = document.getElementsByClassName('item');
    catItem[0].classList = 'item active';
    // active class change by onclick
    let a = document.getElementsByClassName('item');
   
    for (var i = 0; i < a.length; i++) {
        a[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].classList = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}


categories();



// data load by click on category list

const loadData = async (id=1000) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const dataStore = data.data;
    // for checking
    // console.log(dataStore);
    displayData(dataStore);
   
}

const loadOnClick = (id) => {
    
    loadData(id);
}
loadData();

const displayData = (dataStore) =>{
    const container = document.getElementById('card_container');
    container.classList.add('cards');
    // console.log(dataStore);
    // let viewsAll;
    // for(let data of dataStore){
    //     viewsAll = data.others.views;
    // }
    // console.log(viewsAll);
    // console.log(viewsAll);
   
    // clear to load current data
    container.textContent = '';
    
   if(dataStore.length != 0){
    dataStore.forEach(data => {
        // console.log(data);
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl';

        // verified symbols
       const symbol = data.authors[0].verified;
        
       if(symbol === true){
        div.innerHTML = `
        <figure><img src="${data.thumbnail}" alt="Image" />
            <span class="postedDate">${data.others.posted_date}</span>
        </figure>
                    <div class="card-body">
                    <div class='flex w-100'>
                    <img class='w-15 profile_img' src="${data.authors[0].profile_picture}" alt="Image" />
                    <h2 class="card-title px-2">${data.title}</h2>
                    </div>
                      <h4 class='profile_name flex'>${data.authors[0].profile_name}   <img class="verified_img" src="./assets/img/verified.jpg" alt=""></h4>
                      <p>${data.others.views} Views</p>
                      <div class="card-actions justify-center">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        
        `;

       }
        else {
            div.innerHTML = `
        <figure><img src="${data.thumbnail}" alt="Image" />
        <span class="postedDate">${data.others.posted_date}</span>
        </figure>
                    <div class="card-body">
                    <div class='flex w-100'>
                    <img class='w-15 profile_img' src="${data.authors[0].profile_picture}" alt="Image" />
                    <h2 class="card-title px-2">${data.title}</h2>
                    </div>
                      <h4 class='profile_name flex'>${data.authors[0].profile_name} </h4>
                      <p>${data.others.views} Views</p>
                      <div class="card-actions justify-center">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        
        `;
        }

       
        container.appendChild(div);
       
        
    });
   }
   else{
    container.classList.remove('cards');
    const div = document.createElement('div');
    div.classList = 'text-center my-40 w-100'
    div.innerHTML = `
        <div class="text-center flex  flex-col items-center">
        <img src="./assets/img/Icon.png" alt="image" />
        <h1 style='color:red; font-size:2rem'>No data found</h1>
        </div>
    `;
    container.appendChild(div);
   }

  
   
    
}


// const verifiedSymbolShow = (s) =>{
//     console.log(s);
//     s.forEach(data =>{
//         const symbol = data.authors[0].verified;
//         console.log(symbol);
//         if( symbol === true){
//             console.log('hello');
//             const fieldOfVerified = document.getElementById('verified_field');
//             const div = document.createElement('div');
//             div.innerHTML = `
//             <img src="./assets/img/verified.jpg" alt="verified">
//             `;
//             fieldOfVerified.appendChild(div);
//         }
        
//        })
// }
// verifiedSymbolShow();


