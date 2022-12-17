import requests
def download(r):
    url="https://bit.ly/"+str(r)
    local = url.split('/')[-1]
    with requests.get(url) as r:
        assert r.status_code == 200, f'error'
        with open(local, 'wb') as f:
            f.write(r.content)
    return local        