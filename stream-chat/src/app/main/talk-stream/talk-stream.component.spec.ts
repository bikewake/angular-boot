import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkStreamComponent } from './talk-stream.component';

describe('TalkStreamComponent', () => {
  let component: TalkStreamComponent;
  let fixture: ComponentFixture<TalkStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalkStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalkStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
