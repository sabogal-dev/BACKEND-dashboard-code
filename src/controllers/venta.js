export async function ventas(fecha, vendedor, fechaFinal) {

    // PARAMETROS DE FILTROS
    const condiciones = [
        { valor: fecha, filtro: ["date_order", ">=", fecha] },
        { valor: fecha, filtro: ["date_order", "<=", fechaFinal] },
        { valor: vendedor, filtro: ["user_id", "=", vendedor] }
    ]
    const filter = [["state", "=", "sale"]]

    // AGREGAR FILTROS SEGUN CORRESPONDA
    condiciones.forEach(condicion => {
        if (condicion.valor !== undefined && condicion.valor !== null && condicion.valor !== "") {
            filter.push(condicion.filtro)
        }
    });

    // parametro de API ODOO
    let params = {
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
            "db": "crm",
            "login": "bodega@codeoptikal.com",
            "password": "4cd4f8dc9b4c44618090186c949c14a9efcea8f1",
            "service": "object",
            "method": "execute_kw",
            "args": [
                "crm",
                7,  // UID del usuario autenticado
                "Dav1d25*",
                "sale.order",
                "search_read",
                [
                    filter
                ],
                {
                    "fields": ["id", "name", "partner_id", "date_order", "user_id", "amount_untaxed"]
                }
            ]
        },
        "id": 2
    }

    let response = await fetch('https://www.crm.codeoptikal.com/jsonrpc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });


    let resultado = await response.json();
    let ids = resultado.result.map((pedido) => {
        return pedido.id
    })


    return { resultado, ids } //devuelve los pedidos con detalles y la lista de ids de pedidos
}