using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cellar.Hub.Core;
using Cellar.Hub.Core.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System.IO;
using ImageCore = ImageProcessorCore;
using Microsoft.Extensions.Configuration;
using Serilog;
using Microsoft.Extensions.Logging;

namespace Cellar.Hub.Api.Controllers
{
    public class SpaceController : Controller
    {
        CellarHubService _service;

        ILogger<SpaceController> _log;

        private string _fileStoreUrl_temp;
        private string _fileStoreUrl_products_small;
        private string _fileStoreUrl_products_full;
        private string _fileStoreUrl_others;
        private string _fileStoreUrl_ImageServer;


        public SpaceController(CellarHubService service, IConfigurationRoot configuration, ILogger<SpaceController> log)
        {
            _log = log;
            _service = service;
            _fileStoreUrl_temp = configuration.GetValue<string>("Paths:Cellar.TempImagePath");
            _fileStoreUrl_products_small = configuration.GetValue<string>("Paths:Cellar.ImagePath") + "\\products\\small";
            _fileStoreUrl_products_full = configuration.GetValue<string>("Paths:Cellar.ImagePath") + "\\products\\full";
            _fileStoreUrl_others = configuration.GetValue<string>("Paths:Cellar.ImagePath") + "\\others";
            _fileStoreUrl_ImageServer = configuration.GetValue<string>("Paths:Cellar.ImagesServer");
        }


        [HttpGet]
        public int GetValue()
        {
            _log.LogInformation("Test of logging");
            return 5;
        }


        [HttpGet]
        public CellarDTO GetAllCellarSpaces()
        {
            var result = _service.GetAllCellarSpaces();
            return result;
        }

        [HttpPost]
        public CellarDTO GetCellarSpace([FromBody]string id)
        {
            var result = _service.GetCellarSpace(id);
            return result;
        }


        [HttpPost]
        public CellarDTO AddCellarSpace([FromBody]CellarSpace item)
        {
            var result = _service.AddCellarSpace(item);
            return result;
        }


        [HttpPost]
        public CellarDTO RemoveCellarSpace([FromBody]CellarSpace item)
        {
            var result = _service.RemoveCellarSpace(item);
            return result;
        }


        [HttpPost]
        public CellarDTO UpdateCellarSpace([FromBody]CellarSpace item)
        {
            var result = _service.UpdateCellarSpace(item);
            return result;
        }






        [HttpGet]
        public CellarDTO GetCellarSenzors()
        {
            var result = _service.GetAllCellarSenzors();
            return result;
        }

        [HttpPost]
        public CellarDTO GetCellarSenzor([FromBody]string id)
        {
            var result = _service.GetCellarSenzor(id);
            return result;
        }

        [HttpPost]
        public CellarDTO AddCellarSenzor([FromBody]CellarSenzor item)
        {
            var result = _service.AddCellarSenzor(item);
            return result;
        }

        [HttpPost]
        public CellarDTO RemoveCellarSenzor([FromBody]CellarSenzor item)
        {
            var result = _service.RemoveCellarSenzor(item);
            return result;
        }
        
        [HttpPost]
        public CellarDTO UpdateCellarSenzor([FromBody]CellarSenzor item)
        {
            var result = _service.UpdateCellarSenzor(item);
            return result;
        }





        /**********************************************/
        /*              HELPERS                   */
        /**********************************************/

        [HttpPost]
        public CellarDTO Upload(IFormFile file)
        {
            try
            {
                if (file == null) throw new Exception("File is null");
                if (file.Length == 0) throw new Exception("File is empty");


                if (file.Length > 0)
                {

                    string fileName = ContentDispositionHeaderValue
                            .Parse(file.ContentDisposition)
                            .FileName
                            .Trim().ToString();

                    //odebrani pripony
                    var extension = fileName.Split('.').Last();
                    fileName = fileName.Replace("." + extension, "");

                    //vygenerovani unikatniho jmena a ulozeni do temp adresare
                    //var uniqueTempFileWithPath = Alza.Library.ImageUtils.GraphicUtils.GetUniqueFileName(_fileStoreUrl_temp, ref fileName, "." + extension);
                    var uniqueTempFileWithPath = "";
                    using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }

                    //zjisteni unikatniho jmena bez cesty
                    var uniqueFileWithouPath = uniqueTempFileWithPath.Split('\\').Last();



                    //ulozeni do OTHERS adresare
                    using (FileStream stream = System.IO.File.OpenRead(uniqueTempFileWithPath))
                    using (FileStream output = System.IO.File.OpenWrite(Path.Combine(_fileStoreUrl_others, uniqueFileWithouPath)))
                    {
                        ImageCore.Image image = new ImageCore.Image(stream);
                        image.Save(output);
                    }





                    //Vratime celou cestu k image serveru
                    string result = _fileStoreUrl_ImageServer + "/others/" + uniqueFileWithouPath;

                    return CellarDTO.Data(result);
                }

                return CellarDTO.CustomError("CatalogController.Upload() : file.Length <= 0");
            }
            catch (Exception e)
            {
                //_logger.LogError("CatalogController.Upload() : " + e.Message);
                return CellarDTO.Exception(Guid.NewGuid(), e.Message);
            }
        }


        [HttpPost]
        public CellarDTO UploadFullSmall(IFormFile file)
        {
            try
            {
                if (file == null) throw new Exception("File is null");
                if (file.Length == 0) throw new Exception("File is empty");


                if (file.Length > 0)
                {

                    string fileName = ContentDispositionHeaderValue
                            .Parse(file.ContentDisposition)
                            .FileName
                            .Trim().ToString();

                    //odebrani pripony
                    //var extension = fileName.Split('.').Last();
                    //fileName = fileName.Replace("." + extension, "");

                    //vygenerovani unikatniho jmena a ulozeni do temp adresare
                    //var uniqueTempFileWithPath = Alza.Library.ImageUtils.GraphicUtils.GetUniqueFileName(_fileStoreUrl_temp, ref fileName, "." + extension);
                    //var uniqueTempFileWithPath = _fileStoreUrl_temp + "\\" + fileName;
                    //using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
                    //{
                    //    file.CopyTo(fs);
                    //    fs.Flush();
                    //}

                    //zjisteni unikatniho jmena bez cesty
                    //var uniqueFileWithouPath = uniqueTempFileWithPath.Split('\\').Last();



                    // Parse the connection string and return a reference to the storage account.
                    // CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=internetaveci;AccountKey=5SzQiO7AVs0S/AnQCtf/DUXxUh+enY/iZy7KGdHB97wAi5E+C9G+HmsoHEhAmkNee7Eo5QPqHaDmstVO4ocyJw==;EndpointSuffix=core.windows.net");


                    // CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();


                    // // Get a reference to the file share we created previously.
                    // CloudBlobContainer container = blobClient.GetContainerReference("img");


                    // // Retrieve reference to a blob named "myblob".
                    // CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);


                    // //save to temp location
                    // var uniqueTempFileWithPath = _fileStoreUrl_temp + "\\" + fileName;
                    // using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
                    // {
                    //     file.CopyTo(fs);
                    //     fs.Flush();
                    // }



                    // // Create or overwrite the "myblob" blob with contents from a local file.
                    // using (var fileStream = System.IO.File.OpenRead(uniqueTempFileWithPath))
                    // {
                    //     blockBlob.UploadFromStreamAsync(fileStream).Wait();
                    // }


                    // Ensure that the share exists.
                    //if (share.ExistsAsync().Result)
                    //{
                    //    // Get a reference to the root directory for the share.
                    //    CloudFileDirectory rootDir = share.GetRootDirectoryReference();

                    //    // Get a reference to the directory we created previously.
                    //    CloudFileDirectory sampleDir = rootDir.GetDirectoryReference("Product_MainImages");

                    //    // Ensure that the directory exists.
                    //    if (sampleDir.ExistsAsync().Result)
                    //    {
                    //        // Get a reference to the file we created previously.





                    //        CloudFile file2 = sampleDir.GetFileReference(fileName);

                    //        var uniqueTempFileWithPath = _fileStoreUrl_temp + "\\" + fileName;
                    //        using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
                    //        {
                    //            file.CopyTo(fs);
                    //            fs.Flush();
                    //        }


                    //        file2.UploadFromFileAsync("C:" + uniqueTempFileWithPath).Wait();

                    //        ressss = file2.StorageUri.PrimaryUri.AbsoluteUri;


                    //        // Ensure that the file exists.
                    //        //if (file2.ExistsAsync().Result)
                    //        //{
                    //        //    // Write the contents of the file to the console window.
                    //        //    ressss = file2.DownloadTextAsync().Result;
                    //        //}


                    //        //var aaa = file2.OpenWriteAsync(.Result;



                    //        int i = 5;
                    //    }
                    //}



                    ////ulozeni do FULL adresare
                    //using (FileStream stream = System.IO.File.OpenRead(uniqueTempFileWithPath))
                    //using (FileStream output = System.IO.File.OpenWrite(Path.Combine(_fileStoreUrl_products_full, uniqueFileWithouPath)))
                    //{
                    //    ImageCore.Image image = new ImageCore.Image(stream);
                    //    image.Save(output);
                    //}

                    ////ulozeni do SMALL adresare
                    //using (FileStream stream = System.IO.File.OpenRead(uniqueTempFileWithPath))
                    //using (FileStream output = System.IO.File.OpenWrite(Path.Combine(_fileStoreUrl_products_small, uniqueFileWithouPath)))
                    //{
                    //    ImageCore.Image image = new ImageCore.Image(stream);
                    //    image.Resize(image.Width / 2, image.Height / 2)
                    //         .Save(output);
                    //}

                    ////Vratime pouze nazev souboru, abychom do DB nemuseli ukladat cestu ke small a full, ulozime jen nazev a na UI si sahne do spravne slozky podle potreby
                    //string result = _fileStoreUrl_ImageServer + "/products/small/" + uniqueFileWithouPath;


                    string resUrl = "https://internetaveci.blob.core.windows.net/img/" + fileName;


                    return CellarDTO.Data(resUrl);
                }

                return CellarDTO.CustomError("CatalogController.UploadFullSmall() : file.Length <= 0");
            }
            catch (Exception e)
            {
                //_logger.LogError("CatalogController.UploadFullSmall() : " + e.Message);
                return CellarDTO.Exception(Guid.NewGuid(), e.Message);
            }
        }



    }
}
