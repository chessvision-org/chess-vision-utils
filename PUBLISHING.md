# Publishing Guide

## İlk dəfə publish (manual)

### 1. npm hesabına giriş

```bash
npm login
# → username, password, email, OTP soruşacaq
# Uğurlu giriş: "Logged in as <username>"

npm whoami   # giriş etdiyini yoxla
```

### 2. Scoped paket üçün org yaratmaq (hələ yoxdursa)

npmjs.com saytında `chessvision-org` adında organization yaratmalısan.
Sonra:

```bash
npm org create chessvision-org   # CLI ilə
# ya da npmjs.com/org/create saytından
```

### 3. İlk publish

```bash
npm run build     # dist/ yenilə
npm test          # testlər keçir?
npm publish --access public
```

`@scoped` paketlər default olaraq private olur — `--access public` şərtdir.

---

## GitHub Actions ilə avtomatik publish

### 1. NPM_TOKEN yarat

1. [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens) → **Generate New Token**
2. Token type: **Granular Access Token** (tövsiyə) ya da **Automation**
3. Scope: `@chessvision-org/*` paketlər üçün **Read and Write**
4. Token-ı kopyala

### 2. GitHub repo secrets

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Name | Value |
|------|-------|
| `NPM_TOKEN` | yuxarıdakı npm tokeni |

### 3. Repo-nu GitHub-a push et

```bash
git remote add origin https://github.com/chessvision-org/chess-vision-utils.git
git push -u origin main
```

### 4. Release etmək

GitHub repo → **Actions** → **Release** → **Run workflow** → **Run**

Workflow avtomatik:
1. Testləri işlədir
2. Build edir
3. Commit mesajlarına əsasən versiya hesablayır (`feat` → minor, `fix` → patch, `BREAKING CHANGE` → major)
4. `CHANGELOG.md` yeniləyir
5. `package.json` versiyasını artırır
6. npm-ə publish edir
7. GitHub Release yaradır

---

## Versiya qaydaları (Conventional Commits)

```bash
# Patch (1.0.0 → 1.0.1)
git commit -m "fix: correct SVG coordinate rendering for flipped boards"
git commit -m "perf: cache piece SVG string parsing"

# Minor (1.0.0 → 1.1.0)  
git commit -m "feat: add highlightSquares option to generateDiagram"

# Major (1.0.0 → 2.0.0)
git commit -m "feat!: rename generateDiagram to renderDiagram

BREAKING CHANGE: generateDiagram is now renderDiagram"
```

---

## İstifadəçi üçün: versiya yoxlama və yükləmə

```bash
# Ən son versiya nədir?
npm view @chessvision-org/chess-vision version

# Bütün versiyalar
npm view @chessvision-org/chess-vision versions --json

# Lokal quraşdırılmış versiya
npm list @chessvision-org/chess-vision

# Ən son stable
npm install @chessvision-org/chess-vision

# Spesifik versiya (məsələn, 1.0.0)
npm install @chessvision-org/chess-vision@1.0.0

# Major-ın ən son minoru (1.x.x → hər zaman ən yeni 1.x)
npm install @chessvision-org/chess-vision@^1.0.0

# Minor-ın ən son patchi (1.2.x saxla)
npm install @chessvision-org/chess-vision@~1.2.0

# Upgrade et
npm update @chessvision-org/chess-vision
# ya da
npm install @chessvision-org/chess-vision@latest
```

---

## Publish öncəsi kontrol siyahısı

```bash
npm run build      # ✓ dist/ yeniləndi?
npm test           # ✓ 72/72 test keçir?
npm run typecheck  # ✓ TypeScript xətası yoxdur?
npm pack --dry-run # ✓ nə publish olunur?
```

`npm pack --dry-run` çıxışında yalnız bunlar olmalıdır:
- `dist/index.js`
- `dist/index.cjs`  
- `dist/index.d.ts`
- `dist/index.d.cts`
- `README.md`
- `CHANGELOG.md`
- `package.json`
