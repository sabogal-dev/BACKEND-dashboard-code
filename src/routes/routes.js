import { lineasProducto } from "../controllers/lineasProducto.js";
import { ventas } from "../controllers/venta.js";

export async function ventasruta(req, res) {
    const vendedor = req.query.vendedor;
    const fecha = req.query.fecha;//FORMATO DE FECHA YEAR MONTH DAY


    let { resultado, ids } = await ventas(fecha, vendedor);// buscamos las ventas y devolvemos datos y ids para buscar detalles
    const {monturas, categorias} = await lineasProducto(ids);// extraer el detalle de todos los productos de la venta



    resultado.result.map((pedido) => { // asignar a cada pedido su arreglo de monturas
        pedido.orderLine = monturas.result.filter((montura) => {// crea en el objeto la propiedad orderline con un listado de monturas
            return montura.order_id[0] == pedido.id
        })
    })


    const respuesta = {
        ventas: resultado.result,
        monturas,
        categorias
    }
    res.json(respuesta)
}
