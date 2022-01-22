const departamento = document.getElementById("departamento");
const provincia = document.getElementById("provincia");
const distrito = document.getElementById("distrito");

let agenciaInfo = document.querySelector('.agencia-info')

let listDepartamentos = []
let listProvincias = []

const xhttp = new XMLHttpRequest();

xhttp.open('GET','JS/agency.json', true);
    
xhttp.send();

 xhttp.onreadystatechange =  function (){

    if(this.readyState == 4 && this.status == 200){
        departamento.innerHTML = ''
        let datos = JSON.parse(this.responseText);
        let listaD = []
        
        for(let depa of datos){
            listaD.push(depa.departamento)
        }
        mostrarOpciones(listDepartamentos, listaD, departamento)
        
        departamento.addEventListener('change',function(){
            let listaP = []
            let depa = departamento.value
            for(let item of datos){
                if(depa == item.departamento){
                    listaP.push(item.provincia)
                }
            }
            mostrarOpciones(listProvincias, listaP, provincia )
            distrito.innerHTML = ''
        })
        provincia.addEventListener('change',function(){
            let provi = provincia.value
            let elementos = '<option class="selector-options__op" selected disabled="">Seleccione</option>'
            for(let item of datos){
                if(provi == item.provincia){
                    elementos += '<option class="selector-options__op" value="'+item.distrito+'">'+item.distrito+'</option>'
                }
            }
            distrito.innerHTML = elementos
        })
        document.querySelector('.agencia-selector-send').addEventListener('click', ()=>{
            
            agenciaInfo.innerHTML = ''
            for(let item of datos){
                if(departamento.value == item.departamento){
                    if(distrito.value == item.distrito){
                        agenciaInfo.innerHTML += `
                        <div class="info-location">
                            <div class="info-location-direction">
                                <span class="direction__location">${item.departamento}/${item.provincia}/${item.distrito}
                                    <span class="direction__location--size">${item.provincia}</span>
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
        });
        agenciaInfo.innerHTML = ''
    }
}

function mostrarOpciones (listageneral, listalocal, ubicacion){
    listageneral =  listalocal.filter((elemet, index, array)=>{
        return index === array.indexOf(elemet)
    })
    let elementos = '<option class="selector-options__op" selected disabled="">Seleccione</option>'
    for(item of listageneral){
        elementos += '<option class="selector-options__op" value="'+item+'">'+item+'</option>'
    }
    ubicacion.innerHTML = elementos
}