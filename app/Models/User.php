<?php

namespace App\Models;

use App\Contracts\HasCrudSupport;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmailInterface
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use HasCrudSupport;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getWebUrls()
    {
        return [
            'index' => 'usuarios',
            'create' => 'usuario/criar',
            'item' => 'usuario/{id}',
        ];
    }

    public static function validateForUpdate(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
    }

    public function getFieldsDefinition(): array
    {
        return [
            'default' => [
                'name' => [
                    'label' => 'Nome',
                    'type' => 'text',
                ],
                'email' => [
                    'label' => 'E-mail',
                    'type' => 'email',
                ],
                'password' => [
                    'label' => 'Senha',
                    'type' => 'password',
                ],
            ],
        ];
    }
}
