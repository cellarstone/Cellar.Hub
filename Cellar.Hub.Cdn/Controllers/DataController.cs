using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System.IO;
// using ImageCore = ImageProcessorCore;
using Microsoft.Extensions.Configuration;
using Serilog;
using Microsoft.Extensions.Logging;
using System.Text;
using Microsoft.AspNetCore.Hosting;

namespace Cellar.Hub.Cdn.Controllers
{
    public class DataController : Controller
    {
        ILogger<DataController> _log;

        private readonly IHostingEnvironment _hostingEnvironment;


        private string _imageFolder;
        private string _cdnUrl;


        public DataController(ILogger<DataController> log, IConfigurationRoot configuration, IHostingEnvironment hostingEnvironment)
        {
            _log = log;
            _hostingEnvironment = hostingEnvironment;
            _imageFolder = configuration.GetValue<string>("Paths:ImageFolder");
            _cdnUrl = configuration.GetValue<string>("Paths:CdnUrl");

        }


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
                    var extension = fileName.Split('.').Last().Replace("\"", "");
                    fileName = fileName.Replace("." + extension, "");

                    //vygenerovani unikatniho jmena a ulozeni do temp adresare
                    //var uniqueTempFileWithPath = Alza.Library.ImageUtils.GraphicUtils.GetUniqueFileName(_fileStoreUrl_temp, ref fileName, "." + extension);
                    var uniqueName = GetRandomName();
                    var contentPath = _hostingEnvironment.ContentRootPath;
                    var dataPath = contentPath + _imageFolder;
                    var uniqueTempFileWithPath = Path.Combine(dataPath, uniqueName);
                    // using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
                    // {
                    //     file.CopyTo(fs);
                    //     fs.Flush();
                    // }

                    using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath + "." + extension))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }

                    // //zjisteni unikatniho jmena bez cesty
                    // var uniqueFileWithouPath = uniqueTempFileWithPath.Split('\\').Last();



                    // //ulozeni do OTHERS adresare
                    // using (FileStream stream = System.IO.File.OpenRead(uniqueTempFileWithPath))
                    // using (FileStream output = System.IO.File.OpenWrite(Path.Combine(_imageFolder, uniqueFileWithouPath)))
                    // {
                    //     ImageCore.Image image = new ImageCore.Image(stream);
                    //     image.Save(output);
                    // }


                    //Vratime celou cestu k image serveru
                    string result = _cdnUrl + "/Data/" + uniqueName + "." + extension;

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





        // Generate a random string
        public string GetRandomName()
        {
            Random rnd = new Random();
            string characters = "0123456789abcdefghijklmnopqrstuvwxyz";
            StringBuilder result = new StringBuilder(5);
            for (int i = 0; i < 5; i++)
            {
                result.Append(characters[rnd.Next(characters.Length)]);
            }
            return "randomName-" + result.ToString();
        }


        // [HttpPost]
        // public CellarDTO UploadFullSmall(IFormFile file)
        // {
        //     try
        //     {
        //         if (file == null) throw new Exception("File is null");
        //         if (file.Length == 0) throw new Exception("File is empty");


        //         if (file.Length > 0)
        //         {

        //             string fileName = ContentDispositionHeaderValue
        //                     .Parse(file.ContentDisposition)
        //                     .FileName
        //                     .Trim().ToString();

        //             //odebrani pripony
        //             //var extension = fileName.Split('.').Last();
        //             //fileName = fileName.Replace("." + extension, "");

        //             //vygenerovani unikatniho jmena a ulozeni do temp adresare
        //             //var uniqueTempFileWithPath = Alza.Library.ImageUtils.GraphicUtils.GetUniqueFileName(_fileStoreUrl_temp, ref fileName, "." + extension);
        //             //var uniqueTempFileWithPath = _fileStoreUrl_temp + "\\" + fileName;
        //             //using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
        //             //{
        //             //    file.CopyTo(fs);
        //             //    fs.Flush();
        //             //}

        //             //zjisteni unikatniho jmena bez cesty
        //             //var uniqueFileWithouPath = uniqueTempFileWithPath.Split('\\').Last();



        //             // Parse the connection string and return a reference to the storage account.
        //             // CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=internetaveci;AccountKey=5SzQiO7AVs0S/AnQCtf/DUXxUh+enY/iZy7KGdHB97wAi5E+C9G+HmsoHEhAmkNee7Eo5QPqHaDmstVO4ocyJw==;EndpointSuffix=core.windows.net");


        //             // CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();


        //             // // Get a reference to the file share we created previously.
        //             // CloudBlobContainer container = blobClient.GetContainerReference("img");


        //             // // Retrieve reference to a blob named "myblob".
        //             // CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);


        //             // //save to temp location
        //             // var uniqueTempFileWithPath = _fileStoreUrl_temp + "\\" + fileName;
        //             // using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
        //             // {
        //             //     file.CopyTo(fs);
        //             //     fs.Flush();
        //             // }



        //             // // Create or overwrite the "myblob" blob with contents from a local file.
        //             // using (var fileStream = System.IO.File.OpenRead(uniqueTempFileWithPath))
        //             // {
        //             //     blockBlob.UploadFromStreamAsync(fileStream).Wait();
        //             // }


        //             // Ensure that the share exists.
        //             //if (share.ExistsAsync().Result)
        //             //{
        //             //    // Get a reference to the root directory for the share.
        //             //    CloudFileDirectory rootDir = share.GetRootDirectoryReference();

        //             //    // Get a reference to the directory we created previously.
        //             //    CloudFileDirectory sampleDir = rootDir.GetDirectoryReference("Product_MainImages");

        //             //    // Ensure that the directory exists.
        //             //    if (sampleDir.ExistsAsync().Result)
        //             //    {
        //             //        // Get a reference to the file we created previously.





        //             //        CloudFile file2 = sampleDir.GetFileReference(fileName);

        //             //        var uniqueTempFileWithPath = _fileStoreUrl_temp + "\\" + fileName;
        //             //        using (FileStream fs = System.IO.File.Create(uniqueTempFileWithPath))
        //             //        {
        //             //            file.CopyTo(fs);
        //             //            fs.Flush();
        //             //        }


        //             //        file2.UploadFromFileAsync("C:" + uniqueTempFileWithPath).Wait();

        //             //        ressss = file2.StorageUri.PrimaryUri.AbsoluteUri;


        //             //        // Ensure that the file exists.
        //             //        //if (file2.ExistsAsync().Result)
        //             //        //{
        //             //        //    // Write the contents of the file to the console window.
        //             //        //    ressss = file2.DownloadTextAsync().Result;
        //             //        //}


        //             //        //var aaa = file2.OpenWriteAsync(.Result;



        //             //        int i = 5;
        //             //    }
        //             //}



        //             ////ulozeni do FULL adresare
        //             //using (FileStream stream = System.IO.File.OpenRead(uniqueTempFileWithPath))
        //             //using (FileStream output = System.IO.File.OpenWrite(Path.Combine(_fileStoreUrl_products_full, uniqueFileWithouPath)))
        //             //{
        //             //    ImageCore.Image image = new ImageCore.Image(stream);
        //             //    image.Save(output);
        //             //}

        //             ////ulozeni do SMALL adresare
        //             //using (FileStream stream = System.IO.File.OpenRead(uniqueTempFileWithPath))
        //             //using (FileStream output = System.IO.File.OpenWrite(Path.Combine(_fileStoreUrl_products_small, uniqueFileWithouPath)))
        //             //{
        //             //    ImageCore.Image image = new ImageCore.Image(stream);
        //             //    image.Resize(image.Width / 2, image.Height / 2)
        //             //         .Save(output);
        //             //}

        //             ////Vratime pouze nazev souboru, abychom do DB nemuseli ukladat cestu ke small a full, ulozime jen nazev a na UI si sahne do spravne slozky podle potreby
        //             //string result = _fileStoreUrl_ImageServer + "/products/small/" + uniqueFileWithouPath;


        //             string resUrl = "https://internetaveci.blob.core.windows.net/img/" + fileName;


        //             return CellarDTO.Data(resUrl);
        //         }

        //         return CellarDTO.CustomError("CatalogController.UploadFullSmall() : file.Length <= 0");
        //     }
        //     catch (Exception e)
        //     {
        //         //_logger.LogError("CatalogController.UploadFullSmall() : " + e.Message);
        //         return CellarDTO.Exception(Guid.NewGuid(), e.Message);
        //     }
        // }





        // //GET api/download/12345abc
        //     [HttpGet("{id}"]
        //     public async Task<IActionResult> Download(string id) {
        //         var stream = await {{__get_stream_here__}}
        //         var response = File(stream, "application/octet-stream"); // FileStreamResult
        //         return response;
        //     }    



        // // [HttpGet("{id}")]
        // public IActionResult TestMinio(){
        //     String endPoint = null;
        //     String accessKey = null;
        //     String secretKey = null;
        //     bool enableHTTPS = false;

        //         endPoint = "localhost:9000";
        //         accessKey = "W8816E7MZJFHQ8W93PDU";
        //         secretKey = "0aAg9kLYhWVMrvICSJNYPfqN0P5jbqD/wBiqggjY";
        //         enableHTTPS = false;


        //     // WithSSL() enables SSL support in Minio client
        //     MinioClient minioClient = new Minio.MinioClient(endPoint, accessKey, secretKey);


        //         // Set app Info 
        //         minioClient.SetAppInfo("app-name", "app-version");



        //     try
        //     {
        //         // Assign parameters before starting the test 
        //         string bucketName = "testfolder";
        //         //string smallFileName = "ASDF";
        //         string objectName = "HALL19.JPG";



        //         FileStreamResult result = null;

        //         try
        //         {
        //             minioClient.GetObjectAsync(bucketName, objectName, 
        //             (stream) =>
        //             {

        //                 result = File(stream, "application/octet-stream"); // FileStreamResult


        //             }).Wait();

        //         }
        //         catch (Exception e)
        //         {
        //             Console.WriteLine("[Bucket]  Exception: {0}", e);
        //         }




        //        return result;
        //     }
        //     catch (MinioException ex)
        //     {
        //         Console.Out.WriteLine(ex.Message);
        //     }

        //     return null;
        // }


    }
}
