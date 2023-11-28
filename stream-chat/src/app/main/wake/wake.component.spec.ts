import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeComponent } from './wake.component';

describe('WakeComponent', () => {
  let component: WakeComponent;
  let fixture: ComponentFixture<WakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
