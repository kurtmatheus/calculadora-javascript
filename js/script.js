var ope = ['+', '-', '*', '/', '=']
var op = null
    function guardarTecla(event) {
         var tecla = event.key
        if (!isNaN(tecla) || tecla == '.' || tecla == ',') {
          if (tecla == ',') {
            tecla = '.'
          }
          calcular('valor', tecla)
        } else if(ope.includes(tecla)) {
          op = tecla
          calcular('acao', op)
        } else if(tecla == 'Enter') {
          calcular('acao', '=')
        } else if (tecla == 'Delete' || tecla == 'Space' || tecla == 'c') {
          limpaForm()
        }
      }

      var valor1 = null
      var valor2 = null
      var res = null
      function calcular(tipo, valor) {     

        if (tipo == 'acao'  && valor != '.' && valor != '=') {
          if (document.getElementById('result').value.includes(valor1)) {
            op = valor
            console.log("Operador: "+ op)
          } else {
            alert('Primeiramente insira um número para Calcular!')
            document.location.reload(true)
          }           
        } 

        if((tipo == 'valor' 
                  && !document.getElementById('result').value.includes(op)) || res != null){

            if (res != null) 
              limpaForm()

          valor1 =  valor
          var aux1 = document.getElementById('result').value += valor
          if(document.getElementById('result').value.length > 1) {
            valor1 =  aux1
          }
          console.log("Valor 1: " + valor1)
        } else if(tipo == 'acao' && valor != '=' ){
            if(!document.getElementById('result').value.includes(op)){
              document.getElementById('result').value += op
            } else {
              alert('Apenas uma operação por vez!')
              document.location.reload(true)
            } 
        } else if(tipo == 'valor' && document.getElementById('result').value.includes(op)){
            var aux2 = document.getElementById('result').value += valor

            if (valor == '.' && ((aux2.indexOf('.')-1) == op)) {
              alert('Operacao Inválida!')
              document.location.reload(true)
            } 

            valor2 = aux2.slice((aux2.indexOf(op)+1),(aux2.length))
            console.log("Valor 2: " + valor2)
        } 

        if(tipo == 'acao' && valor == '='){

          switch(op) {
          case('+'):
            res = parseFloat(valor1)+parseFloat(valor2)      
            break;
          case('-'):
            res = parseFloat(valor1)-parseFloat(valor2)
            break;
          case('*'):
            res = parseFloat(valor1)*parseFloat(valor2)
            break;
          case('/'):
            if(valor2 > 0) {
              res = parseFloat(valor1)/parseFloat(valor2)
              break;
            } else {
              alert('Não é possível dividir por Zero')
              break;
            }
          default:
            alert('Operação Inválida!')
            document.location.reload(true)
          }
          document.getElementById('result').value = res
          document.getElementById('result').style.fontWeight = 'bold'
          console.log("Resultado: " + res)
        }
      }

      function limpaForm() {
        document.getElementById('result').value = null
        document.getElementById('result').style.fontWeight = 'normal'
        op = null
        valor1 = null
        valor2 = null
        res = null
      }
