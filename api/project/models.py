from django.db import models

class Project(models.Model):
   
    property_type=models.CharField(max_length=20,null=True)

    image=models.ImageField(upload_to='images/',blank=True,null=True)

    project_code=models.CharField(max_length=20,blank=True,null=True)

    contractor_first_name =models.CharField(max_length=30,blank=True)

    contractor_second_name=models.CharField(max_length=30,blank=True)

    contractor_phone_no=models.CharField(max_length=25,blank=True)

    contractor_email=models.EmailField(blank=True)

    architect_first_name =models.CharField(max_length=30,blank=True)

    architect_second_name=models.CharField(max_length=30,blank=True)

    architect_phone_no=models.CharField(max_length=25,blank=True)

    architect_email=models.EmailField(blank=True)

    address_link=models.CharField(max_length=100,null=True)

    city=models.CharField(max_length=20,null=True)

    street=models.CharField(max_length=20,null=True)

    property_no=models.CharField(max_length=20,null=True)

    owner_first_name =models.CharField(max_length=30,blank=True)

    owner_second_name=models.CharField(max_length=30,blank=True)

    owner_phone_no=models.CharField(max_length=25,blank=True)

    owner_email=models.EmailField(blank=True)

    REQUIRED_FIELDS=['property_type','project_code']
    def __str__(self):
      if not self.project_code:
          return "no project code"
      return str(self.project_code)

    

class File(models.Model):
    project_code=models.ForeignKey(Project,related_name='file',on_delete=models.CASCADE,null=True)
    name=models.CharField(max_length=20,null=True)
    file1=models.FileField(upload_to='files/',null=True,blank=True)
    uploaded_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
       return str(self.name)


