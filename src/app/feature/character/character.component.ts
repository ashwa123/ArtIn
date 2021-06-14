import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  characterForm: FormGroup;
  imageForm: FormGroup;
  isdisplayed: boolean = false;
  comicstate: any;
  characterName: any;
  selectedFile: any;
  imageUrl: String = '/assets/default.jpg';
  imageProfileUrl: any;
  characternames: any = [];
  profileimage: any;
  profileimageArray: any[] = [];
  temp: any = [];
  characterdata: any;

  constructor(
    private _comicStateservice: StateserviceService,
    private fb: FormBuilder,
    private router: Router,
    private service: ArtinService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTitle();
    this.getChapterTitle();
    this.validateCharacterForm();
    this.validateImageForm();
    this.getcharacterdetails();
    this.getCharacterName();
  }

  getTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

  getChapterTitle() {
    this._comicStateservice.getCharacterNameState().subscribe((data) => {
      this.characterName = data;
    });
  }

  validateCharacterForm() {
    this.characterForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      work: ['', [Validators.required]],
      about: ['', [Validators.required]],
      role: ['', [Validators.required]],
      behaviour: ['', [Validators.required]],
      likes: ['', [Validators.required]],
      dislikes: ['', [Validators.required]],
      eyecolor: ['', [Validators.required]],
      haircolor: ['', [Validators.required]],
      skintone: ['', [Validators.required]],
      hairstyle: ['', [Validators.required]],
      outfit: ['', [Validators.required]],
      beard: ['', [Validators.required]],
      height: ['', [Validators.required]],
      body: ['', [Validators.required]],
      family: ['', [Validators.required]],
      friends: ['', [Validators.required]],
    })
  }

  validateImageForm() {
    this.imageForm = this.fb.group({
      profileimage: ['', [Validators.required]]
    });
  }

  display() {
    this.isdisplayed = true;
  }

  getCharacterName() {
    this._comicStateservice.getCharacterNameState().subscribe((data) => {
      this.characterName = data;
    });
  }

  profile(event) {
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as String;
    };
    reader.readAsDataURL(event.target.files[0]);
    const formData = new FormData();
    formData.append('profileimage', this.selectedFile, this.selectedFile.name);
    this.service.submitimage(formData, this.comicstate.title, this.characterName.name)
      .subscribe(response => {
        console.log(response);
        this.getProfileimage();
      });
  }

  setName() {
    this.characterName.name = this.characterForm.value.name;
    this._comicStateservice.setCharacterNameState(this.characterName);
    console.log(this.characterName);
    
  }

  submit() {
    this.service.submitCharacter(this.characterForm.value, this.comicstate.title)
      .subscribe(response => {
      });
  }

  getProfileimage() {
    this.service.getProfileimage(this.comicstate.title, this.characterName.name)
      .subscribe(response => {
        console.log(response);
        const unsafeImageUrl = URL.createObjectURL(response);
        this.imageProfileUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      });
  }

  getcharacterdetails() {
    this.service.getcharacterdetails(this.comicstate.title).subscribe(response => {
      console.log(response.resp.charactername);
      for (const character of response.resp) {
        if (!(character in this.characternames)) {
          this.characternames.push(character.charactername);
        }
      }
      console.log(this.characternames);
      // this.names = this.characternames.filter((value, index) => this.characternames.indexOf(value) !== index);
      // console.log(this.names);
      this.getprofile(this.characternames);
    });
  }

  getprofile(characternames) {
    for (let index = 0; index <= characternames.length; index++) {
      this.service.getprofile(this.comicstate.title, characternames[index])
        .subscribe(response => {
          console.log(response);
          const unsafeImageUrl = URL.createObjectURL(response);
          console.log(typeof(unsafeImageUrl))
          this.profileimage = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl)
          console.log(this.profileimage);
          this.profileimageArray.push(this.profileimage);
          console.log(this.profileimageArray);
        });
    }
  }

  open(name) {
    this.service.getcharacter(this.comicstate.title,name)
    .subscribe(response =>{
      console.log(response)
      this.temp = response.resp.characterfeatures;
      for (let index = 0; index < this.temp.length; index++) {
        if(name == this.temp[index].name){
          this.characterdata = this.temp[index] 
        }    
      }
      const dialogRef = this.dialog.open(CharacterDetailComponent, {
        width: '500px',
        data: this.characterdata
      })
      console.log(this.characterdata);
    })
  }

}
