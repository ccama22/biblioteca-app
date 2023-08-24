import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { UserService } from '@modules/user/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { UsersModel } from '@core/models/users.model';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  dataSource: MatTableDataSource<UsersModel>;

  displayedColumns: string[] = ['nro','username', 'email','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  private usersSubscription!: Subscription;

  suscription!: Subscription;

  constructor(
    private userService: UserService,
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
    ) {
    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.matPaginatorIntl.nextPageLabel="Siguiente página";
    this.matPaginatorIntl.previousPageLabel="Página anterior";
    this.matPaginatorIntl.lastPageLabel = "Última página";
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return '0 de 0'; // Texto traducido para "0 of 0"
      }
  
      const startIndex = page * pageSize + 1;
      const endIndex = Math.min(startIndex + pageSize - 1, length);
  
      return `${startIndex} - ${endIndex} de ${length}`;
    };
    this.dataSource = new MatTableDataSource<UsersModel>([]);
  }

  ngOnInit() {
    this.getUser()

    this.suscription = this.userService.refresh$.subscribe(()=>{
        this.getUser()
    })
  }


  getUser():void{
    this.usersSubscription = this.userService.loadUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
  

  editRow(row: any) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '400px', // Ajusta el ancho del modal según tus necesidades
      data: row
    });
    dialogRef.afterClosed();
  }

  deleteRow(row: any) {
    this.userService.deleteUser(row._id).subscribe(
      response => {

        this.snackBar.open(`Usuario eliminado correctamente`, 'Cerrar', {
          duration: 3000 // Duración en milisegundos del snackbar visible
        });
      },
    );
  }
}
