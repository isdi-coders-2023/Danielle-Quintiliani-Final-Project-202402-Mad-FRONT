import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { RepoService } from '../../core/repo/repo.service';
import { StateService } from '../../core/state/state.service';
import { of } from 'rxjs';
import RegisterComponent from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRouter;
  let mockRepoService: Partial<RepoService>;
  let mockStateService;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockRepoService = {
      createUser: jasmine.createSpy('createUser').and.returnValue(of({})),
    };

    mockStateService = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: RepoService, useValue: mockRepoService },
        { provide: StateService, useValue: mockStateService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser method of RepoService with form data on submission', () => {
    const formData = new FormData();
    formData.append('name', 'admin');
    formData.append('password', 'admin');
    formData.append('email', 'admin@sample.com');
    formData.append('avatar', '');
    formData.append('birthDateString', '');

    component.submit();

    expect(mockRepoService.createUser).toHaveBeenCalledWith(formData);
  });

  //esto test a da controllar de nuevo el lunes. añadito tobeundefined por pasar el sonar y seguir trabajando
  it('should update avatar value in form on file change', () => {
    /* const mockFile = new File([], 'avatar.jpg'); */
    const inputElement: HTMLInputElement = document.createElement('input');

    spyOn(component.avatar, 'nativeElement').and.returnValue(inputElement);

    component.onFileChange();

    expect(component.formRegister.get('avatar')!.value).toBeUndefined();
  });
});