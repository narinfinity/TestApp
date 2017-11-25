using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestApp.Core.Entity.Domain;
using TestApp.Core.Interface.Service.Domain;

namespace TestApp.Web.Controllers.Api
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        private readonly IProductStoreService _productStoreService;

        public ProductController(
            IProductStoreService productStoreService)
        {
            _productStoreService = productStoreService;
        }
        // GET: api/Product
        [HttpGet("{categoryId:int?}", Name = "GetProduct")]
        public IEnumerable<Product> Get(int categoryId)
        {
            return _productStoreService.GetProductsByCategory(new Category { Id = categoryId });
        }

        //// GET: api/Product/5
        //[HttpGet("{id:int}")]
        //public Product Get(int id)
        //{
        //    return new Product();
        //}

        // POST: api/Product
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
