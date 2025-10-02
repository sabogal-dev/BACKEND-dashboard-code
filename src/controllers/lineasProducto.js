import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();

export async function lineasProducto(pedidos) {
    let params = {
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
            "db": "crm",
            "login": process.env.DATABASE_USER,
            "password": process.env.DATABASE_PASSWORD,
            "service": "object",
            "method": "execute_kw",
            "args": [
                "crm",
                7,  // UID del usuario autenticado
                "Dav1d25*",
                "sale.order.line",
                "search_read",
                [
                    [
                        ["order_id", "in", pedidos],
                    ]
                ],
                {
                    "fields": ["order_id", "id", "name", "product_id", "price_unit", "product_uom_qty"]
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

    const monturas = await response.json();
    const categorias = categoriasProducto(monturas);
    return { monturas, categorias}
}


// FUNCION PARA CONTAR PIEZAS Y DINERO
function categoriasProducto(monturas) {

    const categorias = [
        { marca: "MIRATTO PREMIUM", nombreFiltro: "PREMIUM", cantidad: 0, dinero: 0, },
        { marca: "MIRATTO PETITE", nombreFiltro: "PET", cantidad: 0, dinero: 0, },
        { marca: "CODE LINE", nombreFiltro: "LINE", cantidad: 0, dinero: 0, },
        { marca: "CODE TR90", nombreFiltro: "TR90", cantidad: 0, dinero: 0, },
        { marca: "TONELLY", nombreFiltro: "TONELLY", cantidad: 0, dinero: 0, },
        { marca: "OH", nombreFiltro: "OH", cantidad: 0, dinero: 0, },
        { marca: "FORZANY", nombreFiltro: "FOR", cantidad: 0, dinero: 0, },
    ]

    categorias.forEach(categoria => {
        monturas.result.forEach(montura => {
            if (montura.name.includes(categoria.nombreFiltro)) {
                categoria.cantidad = categoria.cantidad + montura.product_uom_qty;
                categoria.dinero += montura.price_unit;
            }
        });
    });

    return categorias
}