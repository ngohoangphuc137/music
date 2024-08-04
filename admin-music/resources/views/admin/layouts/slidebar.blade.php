<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 fixed-start bg-gradient-dark"
    id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
        target="_blank">
        <img src="{{ asset('assets/img/logo-ct.png') }}" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold text-white">Material Dashboard 2</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item menu-item">
          <a class="nav-link text-white" href="{{ route('playlist.index') }}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">PlayList</span>
          </a>
        </li>
        <li class="nav-item menu-item">
          <a class="nav-link text-white" href="{{ route('albums.index') }}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">Album</span>
          </a>
        </li>
        <li class="nav-item menu-item">
          <a class="nav-link text-white">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">Songs</span>
            <i class="fas fa-sort-down" style="font-size: medium"></i>
          </a>
          <ul class="nav nav-treeview nav-menu-chidlren">
            <li class="nav-item">
              <a class="nav-link-children text-white" href="{{ route('songs.index') }}">
                <div class="text-white text-center ps-2 me-2 d-flex align-items-center justify-content-center">
                  <i class="material-icons opacity-10">dashboard</i>
                </div>
                <span class="nav-link-text ms-1">Danh sách bài hát</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link-children text-white" href="{{ route('songs.create') }}">
                <div class="text-white text-center ps-2 me-2 d-flex align-items-center justify-content-center">
                  <i class="material-icons opacity-10">dashboard</i>
                </div>
                <span class="nav-link-text ms-1">Thêm bài hát</span>
              </a>
            </li>
          </ul>
        </li>
    
        <li class="nav-item menu-item">
          <a class="nav-link text-white" href="{{ route('artists.index') }}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">view_in_ar</i>
            </div>
            <span class="nav-link-text ms-1">Nghệ sĩ</span>
          </a>
        </li>
        <li class="nav-item menu-item">
          <a class="nav-link text-white" href="{{ route('genres.index') }}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">view_in_ar</i>
            </div>
            <span class="nav-link-text ms-1">Thể loại âm nhạc</span>
          </a>
        </li>
        <li class="nav-item menu-item">
          <a class="nav-link text-white" href="{{ route('countrys.index') }}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">receipt_long</i>
            </div>
            <span class="nav-link-text ms-1">Quốc gia</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>