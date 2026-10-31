const SUPABASE_URL = 'https://hbqjoadubrwuafbfykre.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Wg3q6v4-ZbVK_9WQXnuFpQ_CZXH68L_';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function aplicarMascaraTelefone(input) {
    let v = input.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 7 && v.length <= 10) v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    else if (v.length > 10) v = `(${v.slice(0, 2)}) ${v.slice(2, 3)} ${v.slice(3, 7)}-${v.slice(7)}`;
    input.value = v;
}

async function fazerCadastro(email, password, fullName, phone) {
    const { data, error } = await supabaseClient.auth.signUp({
        email, password,
        options: { data: { full_name: fullName, phone: phone.replace(/\D/g, '') } }
    });
    if (error) throw error;
    return data;
}

async function fazerLogin(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function loginComGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/index.html' } // <-- MUDOU AQUI
    });
    if (error) throw error;
}

async function recuperarSenha(email) {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password.html'
    });
    if (error) throw error;
}