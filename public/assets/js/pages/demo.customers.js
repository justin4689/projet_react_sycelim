document.addEventListener("DOMContentLoaded", () => {
  var e = document.getElementById("customers-datatable");
  e &&
    new DataTable(e, {
      columnDefs: [
        { orderable: !1, render: DataTable.render.select(), targets: 0 },
        { orderable: !1, searchable: !1, targets: -1 },
      ],
      language: {
        paginate: {
          first: '<i class="ri-arrow-left-double-line"></i>',
          previous: '<i class="ri-arrow-left-s-line"></i>',
          next: '<i class="ri-arrow-right-s-line"></i>',
          last: '<i class="ri-arrow-right-double-line"></i>',
        },
        search: "Recherche :",
        lengthMenu: "_MENU_ éléments par page",
        info: "Affichage de _START_ à _END_ sur _TOTAL_ éléments",
        infoEmpty: "Affichage de 0 à 0 sur 0 éléments",
        infoFiltered: "(filtré de _MAX_ éléments au total)",
      },
      select: { style: "multi", selector: "td:first-child" },
      order: [[1, "asc"]],
    });
});
