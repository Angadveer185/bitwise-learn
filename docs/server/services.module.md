This file contains all the information regarding what all the are the services involved and how are we going to tackle the increasing load in the process.

The External Services which are used as of now are

- `file handling` - Cloudinary
- `code execution` - piston

## File Handling

Inorder to handle all the required files i.e. the course-content pdfs and lecture notes provided by the institutions and later on the video content of the applications. In the initial phases, there is not much content and file traffic so we will be using the service of `cloudinary` which offers quite a generous 10GB free tier per userbase and later on when the content is more or the product scales we are going to switch up the service to `AWS S3` for storage of these contents on the cloud.

To follow best practices around the LLD, we have created a fileHandler interface, which will be inherited by both the cloudinary and s3 service so that even when the services are altered, the server doesn't break.

## Code Execution

Creating a compiler of our own and managing all of this stuff is going to be tricky since a lot of edge cases will need to be considered. A Quick example would be a piece of malicious code that creates around 10,000 new files in the file system along with some dummy content in them to use up space so to avoid all of these particular tasks, the good thing is to use an open-source alternative service for which we are going to use `piston` which will make sure to keep the server light weight and similarly compensate with the project.
