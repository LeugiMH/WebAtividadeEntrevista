
$(document).ready(function () {

    $('#BeneCPF').mask('000.000.000-00');
    
    //Cadastro Beneficíário
    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        var inputId = $("#BeneId").val();
        var inputCPF = $("#BeneCPF").val();
        var inputNome = $("#BeneNome").val();

        var bene = { "Id": inputId, "Nome": inputNome, "CPF": inputCPF};

        //Cadastra
        if ($("#BeneIndex").val() == "") {
            //Valida CPF
            if (!cpfExist(inputCPF)) {
                if (validaCPF(inputCPF)) {
                    beneficiarios.push(bene);
                    atualizaLista();
                }
                else
                    alert("CPF Inválido!");
            }
            else
                alert("Já existe um beneficiário com esse CPF!");
        }
        //Altera
        else {
            //Valida CPF
            if (!cpfExist(inputCPF, 1)) {
                if (validaCPF(inputCPF)) {
                    beneficiarios[$("#BeneIndex").val()] = bene;
                    atualizaLista();
                }
                else
                    alert("CPF Inválido");
            }
            else
                alert("Já existe um beneficiário com esse CPF!");
        }
        $("#BeneCPF").val("");
        $("#BeneNome").val("");
        $("#BeneIndex").val("");
        $("#BeneId").val("-1");
        $("#btnModal").html("Incluir");
    });

    function cpfExist(cpf, i = 0) {
        var err = 0;
        beneficiarios.forEach(function (value, index, array) {
            if (cpf == value.CPF) {
                err++;
            }
        });
        if (err > i) {
            return true;
        }
        else
        return false;
    }

    function validaCPF(cpf) {
        cpf = cpf.replace('.', '');
        cpf = cpf.replace('.', '');
        cpf = cpf.replace('-', '');

        if (cpf == "00000000000" || cpf == "11111111111" ||
            cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
            cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
            cpf == "88888888888" || cpf == "99999999999") {
            return false;
        }
        var a = [];
        var b = new Number;
        var c = 11;
        for (i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9) b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
        b = 0;
        c = 11;
        for (y = 0; y < 10; y++) b += (a[y] * c--);
        if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
        status = a[9] + "" + a[10]
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])) {
            return false;
        }
        return true;
    }

    function atualizaLista() {
        //Limpa a lista
        $("#modalBeneficiarios tbody").html("");

        //Atualiza os valores
        $(beneficiarios).each(function (index, data) {
            if (data.CPF != "XXX.XXX.XXX-XX") {
                $("#modalBeneficiarios tbody").append("<tr id='" + data.Id + "'><td>" + data.CPF + "</td><td>" + data.Nome + "</td><td><button class='btn btn-info btnAltera' data-index=\"" + index + "\">Alterar</button><button class='btn btn-info btnExclui' data-index=\"" + index + "\">Excluir</button></td></tr>");
            }
        });
        $(".btnExclui").on("click", function () {
            excluiBeneficiario((this).getAttribute("data-index"));
        });
        $(".btnAltera").on("click", function () {
            alteraBeneficiario((this).getAttribute("data-index"));
        });
        console.log(beneficiarios);
    }

    function excluiBeneficiario(index) {
        beneficiarios[index].CPF = "XXX.XXX.XXX-XX";
        atualizaLista();
    }

    function alteraBeneficiario(index) {
        $("#BeneIndex").val(index);
        $("#BeneId").val(beneficiarios[index].Id);
        $("#BeneCPF").val(beneficiarios[index].CPF);
        $("#BeneNome").val(beneficiarios[index].Nome);
        $("#btnModal").html("Alterar");
    }
});
