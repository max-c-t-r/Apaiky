const departamento = document.getElementById("departamento");
const provincia = document.getElementById("provincia");
const distrito = document.getElementById("distrito");

let listDepartamentos = ['Lima', 'Ayacucho']
let listProvincias = ['Lima', 'Huamanga', 'Víctor Fajardo']
let listDistritos = ['La Molina', 'San Juan Bautista', 'Huancapi']

function mostrarLugares(arreglo, lugar){
    let elementos = '<option class="selector-options__op" selected disabled="">Selecione</option>'
    
    for(let i = 0; i < arreglo.length; i++){
        elementos += '<option class="selector-options__op" value="'+arreglo[i]+'">'+arreglo[i]+'</option>'
    }
    lugar.innerHTML = elementos
}

function recortar(array, inicio, fin, lugar){
    let recortar = array.slice(inicio, fin)
    mostrarLugares(recortar, lugar)
}
mostrarLugares(listDepartamentos, departamento)

departamento.addEventListener('change',function(){
    let valor = departamento.value
    switch(valor){
        case 'Lima':
            recortar(listProvincias, 0, 1, provincia)
        break
        case 'Ayacucho':
            recortar(listProvincias, 1, 3, provincia)
        break
    }
    distrito.innerHTML = ''
})

provincia.addEventListener('change', function(){
    let valor = provincia.value
    if( valor == 'Lima'){
        recortar(listDistritos, 0, 1, distrito)
    }else if(valor == 'Huamanga'){
        recortar(listDistritos, 1, 2, distrito)
    }else{
        recortar(listDistritos, 2, 3, distrito)
    }
})

document.querySelector('.agencia-selector-send').addEventListener('click', traerdatos);

function traerdatos(){
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','JS/agency.json', true);
    
    xhttp.send();

    xhttp.onreadystatechange =  function (){

        if(this.readyState == 4 && this.status == 200){

            let datos = JSON.parse(this.responseText);

            let agenciaInfo = document.querySelector('.agencia-info')

            agenciaInfo.innerHTML = ''
            
            for(let item of datos){
                if(distrito.value == item.distrito){
                    agenciaInfo.innerHTML += `
                    <div class="info-location">
                        <div class="info-location-direction">
                            <span class="direction__location">${item.departamento}/${item.provincia}/${item.distrito}
                                <span class="size">${item.provincia}</span>
                            </span>
                            <div class="direction__ubication">
                                <i class="direction__ubication-icon fas fa-home"></i>
                                <span class="direction__ubication-text">${item.direccion}</span>
                            </div>
                        </div>
                        <div class="info-location-options">
                            <div class="location-options">
                                <i class="location-options__icon fas fa-map-marker-alt"></i> 
                                <span class="location-options__text">Cómo llegar</span> 
                            </div>
                            <div class="location-options">
                                <i class="location-options__icon fas fa-box"></i>
                                <span class="location-options__text">tarifas</span>
                            </div>
                            <div class="location-options">
                                <i class="location-options__icon fas fa-phone"></i>
                                <span class="location-options__text">llamar</span>
                            </div>
                            <div class="location-options">
                                <i class="location-options__icon fab fa-product-hunt"></i>
                                <span class="location-options__text">Cliente Pro</span>
                            </div>
                        </div>
                        <div class="info-location-moreinfo">
                            <div class="moreinfo-op">
                                <i class="moreinfo-op__icon fas fa-phone-volume"></i>
                                <span class="moreinfo-op__text">${item.telefono}</span>
                            </div>
                            <div class="moreinfo-op">
                                <i class="moreinfo-op__icon fas fa-clock"></i>
                                <span class="moreinfo-op__text">${item.horario}</span>
                            </div>
                        </div>
                    </div>
                    `   
                    break;
                }
            } 
        }
    }
}
