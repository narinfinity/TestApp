using Microsoft.AspNetCore.Identity;

namespace TestApp.Core.Entity.App
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        //inherited
        public override string PhoneNumber { get; set; }
        public override string Email { get; set; }
        public override string UserName { get; set; }
        public override string PasswordHash { get; set; }

    }
}
