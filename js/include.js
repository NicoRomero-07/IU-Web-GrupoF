document.write(`

<header class="row">
<!-- NavBar -->
    <nav class="col-12 navbar navbar-expand-lg navbar-dark py-2" style="background-color: #202124;">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">Bocaillo</a>

          <a class="navbar-brand" href="#">
            <img alt="Brand" width="30" height="24"
            src="img/bocaillo.png">
          </a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#"><i class="bi bi-house-door"></i>&emsp;Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Categorias</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Trending</a>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
              <button class="btn btn-light" type="submit">Buscar</button>
            </form>
            <!--Perfil-->
            <div class="dropdown mx-3">
              <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle fs-5" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle"></i>
                <!--<img src="" alt="" width="32" height="32" class="rounded-circle me-2">-->
                <strong>&ensp;Username</strong>
              </a>
              <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                <li><a class="dropdown-item" href="#">Ajustes</a></li>
                <li><a class="dropdown-item" href="#">Perfil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Cerrar sesion</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

<!-- BreadCrumb -->
  <nav class = "row col-12 px-3 py-2 m-0"  style=" background-color: #0d6efd;" aria-label="breadcrumb">
      <ol class="breadcrumb"> 
        <li class="breadcrumb-item ps-1 text-light" aria-current="page">Pagina inicial</li>
      </ol>
  </nav>

</header>

`);